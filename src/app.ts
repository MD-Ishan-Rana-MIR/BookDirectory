import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from './config/config';


const app = express();

app.use(express.json());


if (!config.dbUrl) {
    throw new Error('DB_URL is not defined in the environment variables');
}


mongoose.connect(config.dbUrl)
    .then(() => {
        console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


// book api
import bookRouter from './module/book/bookApi';
app.use("/api/v1/book", bookRouter );
// auth api
import authRouter from "./module/auth/userApi";

app.use("/api/v1/auth",authRouter)



export default app;