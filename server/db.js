import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

const DEFAULT_DB_PATH = path.resolve('server', 'data', 'auth.db');

const ensureDirectory = (dbPath) => {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

export const initDb = () => {
  const dbPath = process.env.DB_PATH ? path.resolve(process.env.DB_PATH) : DEFAULT_DB_PATH;
  ensureDirectory(dbPath);
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS user_progress (
      user_id INTEGER PRIMARY KEY,
      data TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  seedAdmin(db);
  return db;
};

const seedAdmin = (db) => {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(adminUsername);
  if (existing) {
    return;
  }

  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(
    adminUsername,
    passwordHash,
  );
};
