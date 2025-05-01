const mongoose = require('mongoose');

const ManufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  products: {
    type: [String],  // Ensure this is an array of strings
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0;  // Ensure that the products array is not empty
      },
      message: 'Products array cannot be empty'
    }
  }
});

const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);

module.exports = Manufacturer;
