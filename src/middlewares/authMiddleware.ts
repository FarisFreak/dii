import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateNonRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    
    // Ekstrak token dari header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Invalid token format.' });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };

    res.locals = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(400).json({ message: 'Invalid token.' });
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Ekstrak token dari header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Invalid token format.' });
    }

    // Verifikasi token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number, roleId: number };
    
    if (!decoded.roleId)
      return res.status(401).json({ message: 'Access denied. Invalid token format.' });

    res.locals = { userId: decoded.userId, roleId: decoded.roleId };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(400).json({ message: 'Invalid token.' });
  }
};