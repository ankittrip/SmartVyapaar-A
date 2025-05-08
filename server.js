const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
const loginRoutes = require('./routes/authRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');

const app = express();


app.use(cors());
app.use(express.json());


connectDB();


app.use('/api', loginRoutes);                 
app.use('/api/manufacturers', manufacturerRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the SmartVyapaar Backend API');
});


app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
