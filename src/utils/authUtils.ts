import jwt from 'jsonwebtoken';

const generateToken = (userId: number, role: string): string => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

export default generateToken;