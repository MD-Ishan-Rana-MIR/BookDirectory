import express from 'express';
import cors from 'cors';
import { config } from './module/config.js';
import mongoose from 'mongoose';

const app = express();



app.use(cors());
app.use(express.json());    

const dbUrl = config.dbUrl;

if (!dbUrl) {
  throw new Error('Missing DB_URL environment variable');
}

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });



export default app;