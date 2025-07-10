import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: parseInt(process.env.PORT || '3000', 10),
  DB_NAME: process.env.DB_NAME || 'db_dii',
  DB_USER: process.env.DB_USER || 'faris',
  DB_PASSWORD: process.env.DB_PASSWORD || 'faris',
  DB_HOST: process.env.DB_HOST || '192.168.1.46',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
};

export default env;