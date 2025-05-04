const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI not found in environment variables');
    }

    // Connect to MongoDB without deprecated options
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connectDB;
