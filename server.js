const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const loginRoutes = require('./routes/authRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', loginRoutes);                 
app.use('/api/manufacturers', manufacturerRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the SmartVyapaar Backend API');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
