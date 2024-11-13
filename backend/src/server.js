import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cookieParser from "cookie-parser"
import { checkUser } from "./services/authService.js";

dotenv.config();
const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

if (process.env.NODE_ENV !== 'development') {
    dotenv.config({path:'config/.env'});
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.use('*',checkUser);

app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/comments', commentRoutes);
app.use('/payments', paymentRoutes);

// Basic endpoint to verify app is running
app.get('/test', (req, res) => {
    res.send('API is running...');
});

const start = async() => {
    try {
        await mongoose.connect(CONNECTION);
        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();
