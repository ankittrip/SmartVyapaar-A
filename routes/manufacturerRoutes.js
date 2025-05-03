const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Manufacturer = require('../models/Manufacturer');
const mongoose = require('mongoose');

// ✅ GET manufacturers with filtering, pagination, and sorting
router.get('/', async (req, res) => {
  const {
    name,
    category,
    city,
    product,
    page = 1,
    limit = 10,
    sortBy = 'name',
    order = 'asc',
  } = req.query;

  const filter = {};

  if (name) filter.name = { $regex: name, $options: 'i' };
  if (category) filter.category = { $regex: category, $options: 'i' };
  if (city) filter.city = { $regex: city, $options: 'i' };
  if (product) filter['products.name'] = { $regex: product, $options: 'i' };

  const sortOption = {};
  sortOption[sortBy] = order === 'desc' ? -1 : 1;

  try {
    const manufacturers = await Manufacturer.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort(sortOption);

    const total = await Manufacturer.countDocuments(filter);

    res.status(200).json({
      manufacturers,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching manufacturers', error: error.message });
  }
});

// ✅ GET manufacturer by ID
router.get('/:id', async (req, res) => {
  const manufacturerId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(manufacturerId)) {
    return res.status(400).json({ message: 'Invalid manufacturer ID format' });
  }

  try {
    const manufacturer = await Manufacturer.findById(manufacturerId);

    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    res.status(200).json({ manufacturer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching manufacturer details', error: error.message });
  }
});

// ✅ POST new manufacturer (Protected)
router.post('/', verifyToken, async (req, res) => {
  const { name, category, city, products } = req.body;

  if (!name || !category || !city || !products || products.length === 0) {
    return res.status(400).json({ message: 'All fields are required, and products must not be empty' });
  }

  for (let product of products) {
    if (!product.name || !product.price) {
      return res.status(400).json({ message: 'Each product must have a name and price' });
    }
  }

  try {
    const newManufacturer = new Manufacturer({ name, category, city, products });
    await newManufacturer.save();
    res.status(201).json({ message: 'Manufacturer created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving manufacturer', error: error.message });
  }
});

// ✅ PUT update manufacturer by ID (Protected)
router.put('/:id', verifyToken, async (req, res) => {
  const manufacturerId = req.params.id;
  const { name, category, city, products } = req.body;

  if (!mongoose.Types.ObjectId.isValid(manufacturerId)) {
    return res.status(400).json({ message: 'Invalid manufacturer ID format' });
  }

  if (!name || !category || !city || !products || products.length === 0) {
    return res.status(400).json({ message: 'All fields are required, and products must not be empty' });
  }

  for (let product of products) {
    if (!product.name || !product.price) {
      return res.status(400).json({ message: 'Each product must have a name and price' });
    }
  }

  try {
    const updatedManufacturer = await Manufacturer.findByIdAndUpdate(
      manufacturerId,
      { name, category, city, products },
      { new: true }
    );

    if (!updatedManufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    res.status(200).json({ message: 'Manufacturer updated successfully', manufacturer: updatedManufacturer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating manufacturer', error: error.message });
  }
});

// ✅ DELETE manufacturer by ID (Protected)
router.delete('/:id', verifyToken, async (req, res) => {
  const manufacturerId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(manufacturerId)) {
    return res.status(400).json({ message: 'Invalid manufacturer ID format' });
  }

  try {
    const deletedManufacturer = await Manufacturer.findByIdAndDelete(manufacturerId);

    if (!deletedManufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    res.status(200).json({ message: 'Manufacturer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting manufacturer', error: error.message });
  }
});

module.exports = router;
