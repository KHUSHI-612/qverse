import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://qverse-seven.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  return res.json({ ok: true });
});

// API root
app.get('/api', (req, res) => {
  return res.json({ ok: true, name: 'Qverse API' });
});

// Routes
app.use('/api/auth', authRouter);

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


