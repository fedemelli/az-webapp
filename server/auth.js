import jwt from 'jsonwebtoken';

const getJwtSecret = () => process.env.JWT_SECRET || 'dev-secret-change-me';

export const signToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token mancante.' });
  }
  const token = header.slice(7);
  try {
    req.user = verifyToken(token);
    return next();
  } catch {
    return res.status(401).json({ message: 'Token non valido.' });
  }
};

export const requireAdmin = (req, res, next) => {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  if (!req.user || req.user.username !== adminUsername) {
    return res.status(403).json({ message: 'Permessi insufficienti.' });
  }
  return next();
};
