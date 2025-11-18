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

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*', credentials: true }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  return res.json({ ok: true });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/answers', answersRouter);

// Start
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


