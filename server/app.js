import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { initDb, getDb } from './db.js';
import { signToken, requireAuth, requireAdmin } from './auth.js';

const app = express();

const clientOriginEnv = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const allowedOrigins = clientOriginEnv.split(',').map((origin) => origin.trim()).filter(Boolean);
const allowVercelPreview = (process.env.ALLOW_VERCEL_PREVIEW || '').toLowerCase() === 'true';
const isVercelPreviewOrigin = (origin) => {
  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
};
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (allowVercelPreview && isVercelPreviewOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  }),
);
app.use(express.json());

let dbReadyPromise;
const ensureDbReady = () => {
  if (!dbReadyPromise) {
    dbReadyPromise = initDb();
  }
  return dbReadyPromise;
};

const withDb = (handler) => async (req, res, next) => {
  try {
    await ensureDbReady();
    req.db = getDb();
    return await handler(req, res, next);
  } catch (error) {
    return next(error);
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post(
  '/api/auth/login',
  withDb(async (req, res) => {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).json({ message: 'Username e password sono obbligatori.' });
    }

    const { rows } = await req.db.query(
      'SELECT id, username, password_hash FROM users WHERE username = $1',
      [username],
    );
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide.' });
    }

    const isValid = bcrypt.compareSync(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenziali non valide.' });
    }

    const token = signToken({ id: user.id, username: user.username });
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    return res.json({
      token,
      user: { id: user.id, username: user.username, isAdmin: user.username === adminUsername },
    });
  }),
);

app.get(
  '/api/auth/me',
  requireAuth,
  withDb(async (req, res) => {
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    res.json({
      user: { id: req.user.id, username: req.user.username, isAdmin: req.user.username === adminUsername },
    });
  }),
);

const initialProgress = {
  completedTopics: [],
  quizScores: {},
  lastAccessedDay: 1,
};

const getProgressForUser = async (db, userId) => {
  const { rows } = await db.query('SELECT data FROM user_progress WHERE user_id = $1', [userId]);
  if (rows[0]?.data) {
    return rows[0].data;
  }

  const payload = initialProgress;
  await db.query('INSERT INTO user_progress (user_id, data) VALUES ($1, $2)', [userId, payload]);
  return payload;
};

const saveProgressForUser = async (db, userId, progress) => {
  await db.query(
    `INSERT INTO user_progress (user_id, data, updated_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT(user_id)
     DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
    [userId, progress],
  );
};

app.post(
  '/api/auth/register',
  requireAuth,
  requireAdmin,
  withDb(async (req, res) => {
    const { username, password } = req.body ?? {};
    if (!username || !password) {
      return res.status(400).json({ message: 'Username e password sono obbligatori.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'La password deve avere almeno 6 caratteri.' });
    }

    const existing = await req.db.query('SELECT id FROM users WHERE username = $1', [username]);
    if (existing.rows[0]) {
      return res.status(409).json({ message: 'Username già in uso.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const info = await req.db.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
      [username, passwordHash],
    );

    return res.status(201).json({
      user: { id: info.rows[0].id, username, isAdmin: false },
    });
  }),
);

app.get(
  '/api/users',
  requireAuth,
  requireAdmin,
  withDb(async (req, res) => {
    const { rows } = await req.db.query('SELECT id, username FROM users ORDER BY id ASC');
    res.json({ users: rows });
  }),
);

app.delete(
  '/api/users/:id',
  requireAuth,
  requireAdmin,
  withDb(async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) {
      return res.status(400).json({ message: 'ID non valido.' });
    }

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminUser = await req.db.query('SELECT id FROM users WHERE username = $1', [adminUsername]);
    if (adminUser.rows[0]?.id === id) {
      return res.status(400).json({ message: 'Impossibile eliminare l’utente admin.' });
    }

    const info = await req.db.query('DELETE FROM users WHERE id = $1', [id]);
    if (info.rowCount === 0) {
      return res.status(404).json({ message: 'Utente non trovato.' });
    }
    return res.status(204).send();
  }),
);

app.get(
  '/api/progress',
  requireAuth,
  withDb(async (req, res) => {
    const progress = await getProgressForUser(req.db, req.user.id);
    res.json({ progress });
  }),
);

app.put(
  '/api/progress',
  requireAuth,
  withDb(async (req, res) => {
    const progress = req.body?.progress;
    if (!progress || typeof progress !== 'object') {
      return res.status(400).json({ message: 'Payload non valido.' });
    }
    await saveProgressForUser(req.db, req.user.id, progress);
    return res.status(204).send();
  }),
);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Errore interno.' });
});

export default app;
