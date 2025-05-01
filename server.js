const express = require('express');
const cors = require('cors');
require('dotenv').config(); 

const connectDB = require('./config/db');
const loginRoutes = require('./routes/authRoutes');
const manufacturerRoutes = require('./routes/manufacturerRoutes');
const verifyToken = require('./middleware/authMiddleware');
const Manufacturer = require('./models/Manufacturer');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', loginRoutes);
app.use('/manufacturers', manufacturerRoutes);

app.post('/add-manufacturer', verifyToken, async (req, res) => {
  const { name, category, city, products } = req.body;

  if (!name || !category || !city) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const newData = new Manufacturer({ name, category, city, products });
    await newData.save();
    res.status(201).json({ message: 'Manufacturer saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving manufacturer', error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http:
});

