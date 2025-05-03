const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const connectDB = require('./config/db');
const loginRoutes = require('./routes/authRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const verifyToken = require('./middleware/authMiddleware');
const Manufacturer = require('./models/Manufacturer');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json()); // To parse JSON data

// Connect to the database
connectDB();

// Routes setup
app.use('/api', loginRoutes); // Register the login route
app.use('/manufacturers', manufacturerRoutes); // Manufacturer routes

// Protected route example (add manufacturer)



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Root route (just to test if server is running)
app.get('/', (req, res) => {
  res.send('Welcome to the SmartVyapaar Backend API');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
