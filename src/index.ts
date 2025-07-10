import express from 'express';
import { sequelize } from './config/database';
import { specs, swaggerUi } from './config/swagger';
import userRoute from './routes/userRoute';
import roleRoute from './routes/roleRoute';
import menuRoute from './routes/menuRoute';
import authRoute from './routes/authRoute';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRoute);
app.use('/api/role', roleRoute);
app.use('/api/menu', menuRoute);
app.use('/api/auth', authRoute);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Sync database and start server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});