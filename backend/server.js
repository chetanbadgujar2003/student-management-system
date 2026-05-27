import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import courseRoutes from './routes/courses.js';
import paymentRoutes from './routes/payments.js';
import attendanceRoutes from './routes/attendance.js';
import noticeRoutes from './routes/notices.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/notices', noticeRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static assets in production
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.use('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Student Management API is running' });
});

// For any route that doesn't match API endpoints, serve index.html (React routing support)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT}`);
});
