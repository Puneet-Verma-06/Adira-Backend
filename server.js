const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
// Configure CORS to allow your frontend domain
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://sanju-three.vercel.app',
    'https://sanju-frontend.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (lazy connection for serverless)
let dbConnected = false;
const ensureDbConnection = async (req, res, next) => {
  if (!dbConnected) {
    try {
      await connectDB();
      dbConnected = true;
    } catch (error) {
      console.error('Database connection error:', error);
      return res.status(503).json({ 
        success: false, 
        message: 'Database connection failed' 
      });
    }
  }
  next();
};

// Apply database connection middleware to all routes
app.use('/api', ensureDbConnection);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/properties', require('./routes/property'));
app.use('/api/admin', require('./routes/admin'));

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Sanju Backend API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// Only start server if not in Vercel environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
