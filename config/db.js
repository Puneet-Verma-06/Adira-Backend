const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // If already connected, return
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    // Optimize for serverless environment with more aggressive timeouts
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });

    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error(`Error details:`, error);
    isConnected = false;
    
    // Don't exit process in production (Vercel)
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    } else {
      throw new Error(`Database connection failed: ${error.message}`);
    }
  }
};

module.exports = connectDB;
