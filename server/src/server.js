import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import questionsRouter from './routes/questions.js';
import profileRouter from './routes/profile.js';
import answersRouter from './routes/answers.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://qverse-seven.vercel.app'
  ],
  credentials: true
}));


app.get('/api/health', (req, res) => {
  return res.json({ ok: true });
});


app.use('/api/auth', authRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/answers', answersRouter);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in environment');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on :${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


