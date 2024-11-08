import express from 'express';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();

app.use(express.json());


app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/comments', commentRoutes);

// Basic endpoint to verify app is running
app.get('/test', (req, res) => {
    res.send('API is running...');
});

export default app;
