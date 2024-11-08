import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'development') {
    dotenv.config({path:'config/.env'});
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;


const start = async() => {
    try {
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    } catch (e) {
        console.log(e.message);
    }
};

start();

