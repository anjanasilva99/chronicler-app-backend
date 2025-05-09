import express from 'express';
import cors from 'cors';
import { PORT } from './config/config.js';
import upload from './middleware/upload.js';
import { calculate } from './controllers/calculatorController.js';

// Initialize app
const app = express();

// Apply middleware
app.use(cors());

// Routes
app.post('/api/calculate', upload.single('inputFile'), calculate);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});

export default app;