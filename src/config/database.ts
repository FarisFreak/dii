import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Konfigurasi koneksi database
const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'db_dii',
  username: process.env.DB_USER || 'faris',
  password: process.env.DB_PASSWORD || 'faris',
  host: process.env.DB_HOST || '192.168.1.46',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  dialect: 'postgres',
});

export { sequelize };