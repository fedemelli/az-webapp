import bcrypt from 'bcryptjs';
import pg from 'pg';

const { Pool } = pg;

let pool;

export const getDb = () => {
  if (!pool) {
    throw new Error('Database non inizializzato.');
  }
  return pool;
};

export const initDb = async () => {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL/POSTGRES_URL non configurata.');
    }

    pool = new Pool({
      connectionString,
      ssl: process.env.PGSSL_DISABLE ? false : { rejectUnauthorized: false },
      max: Number(process.env.PG_POOL_MAX || 5),
      idleTimeoutMillis: Number(process.env.PG_POOL_IDLE_MS || 10000),
    });
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_progress (
      user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      data JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  await seedAdmin(pool);
};

const seedAdmin = async (db) => {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
  const existing = await db.query('SELECT id FROM users WHERE username = $1', [adminUsername]);
  if (existing.rows[0]) {
    return;
  }

  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  await db.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [
    adminUsername,
    passwordHash,
  ]);
};
