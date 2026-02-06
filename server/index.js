import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { initDb } from './db.js';
import { signToken, requireAuth, requireAdmin } from './auth.js';

const app = express();
const db = initDb();

const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: clientOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ message: 'Username e password sono obbligatori.' });
  }

  const user = db.prepare('SELECT id, username, password_hash FROM users WHERE username = ?').get(username);
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
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  res.json({
    user: { id: req.user.id, username: req.user.username, isAdmin: req.user.username === adminUsername },
  });
});

const initialProgress = {
  completedTopics: [],
  quizScores: {},
  lastAccessedDay: 1,
};

const getProgressForUser = (userId) => {
  const row = db.prepare('SELECT data FROM user_progress WHERE user_id = ?').get(userId);
  if (row?.data) {
    return JSON.parse(row.data);
  }

  const payload = JSON.stringify(initialProgress);
  db.prepare('INSERT INTO user_progress (user_id, data) VALUES (?, ?)').run(userId, payload);
  return initialProgress;
};

const saveProgressForUser = (userId, progress) => {
  const payload = JSON.stringify(progress);
  db.prepare(
    `INSERT INTO user_progress (user_id, data, updated_at)
     VALUES (?, ?, datetime('now'))
     ON CONFLICT(user_id)
     DO UPDATE SET data = excluded.data, updated_at = datetime('now')`,
  ).run(userId, payload);
};

app.post('/api/auth/register', requireAuth, requireAdmin, (req, res) => {
  const { username, password } = req.body ?? {};
  if (!username || !password) {
    return res.status(400).json({ message: 'Username e password sono obbligatori.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'La password deve avere almeno 6 caratteri.' });
  }

  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    return res.status(409).json({ message: 'Username già in uso.' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const info = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(
    username,
    passwordHash,
  );

  return res.status(201).json({ user: { id: info.lastInsertRowid, username, isAdmin: false } });
});

app.get('/api/users', requireAuth, requireAdmin, (_req, res) => {
  const users = db.prepare('SELECT id, username FROM users ORDER BY id ASC').all();
  res.json({ users });
});

app.delete('/api/users/:id', requireAuth, requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ message: 'ID non valido.' });
  }

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminUser = db.prepare('SELECT id FROM users WHERE username = ?').get(adminUsername);
  if (adminUser?.id === id) {
    return res.status(400).json({ message: 'Impossibile eliminare l’utente admin.' });
  }

  const info = db.prepare('DELETE FROM users WHERE id = ?').run(id);
  if (info.changes === 0) {
    return res.status(404).json({ message: 'Utente non trovato.' });
  }
  return res.status(204).send();
});

app.get('/api/progress', requireAuth, (req, res) => {
  const progress = getProgressForUser(req.user.id);
  res.json({ progress });
});

app.put('/api/progress', requireAuth, (req, res) => {
  const progress = req.body?.progress;
  if (!progress || typeof progress !== 'object') {
    return res.status(400).json({ message: 'Payload non valido.' });
  }
  saveProgressForUser(req.user.id, progress);
  return res.status(204).send();
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Auth server running on http://localhost:${port}`);
});
