const Manufacturer = require('../models/Manufacturer');  

exports.getAllManufacturers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;     
  const limit = parseInt(req.query.limit) || 10;  

  try {
    const manufacturers = await Manufacturer.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Manufacturer.countDocuments();

    res.json({ manufacturers, total, page, limit });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manufacturers' });
  }
};


exports.getManufacturerById = async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);

    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    res.json(manufacturer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching manufacturer' });
  }
};

exports.addManufacturer = async (req, res) => {
  const { name, category, city, products } = req.body;

  if (!name || !category || !city || !products || !products.length) {
    return res.status(400).json({ message: 'All fields are required, and products must not be empty' });
  }

  try {
    const newManufacturer = new Manufacturer({ name, category, city, products });
    await newManufacturer.save();

    res.status(201).json(newManufacturer);
  } catch (error) {
    console.error('Error adding manufacturer:', error); 
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Error adding manufacturer', error: error.message });
  }
};


exports.updateManufacturer = async (req, res) => {
  const { name, category, city, products } = req.body;

  try {
    const updated = await Manufacturer.findByIdAndUpdate(
      req.params.id,
      { name, category, city, products },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating manufacturer', error: error.message });
  }
};


exports.deleteManufacturer = async (req, res) => {
  try {
    const deleted = await Manufacturer.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }

    res.json({ message: 'Manufacturer deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting manufacturer' });
  }
};
