const mongoose = require('mongoose');

// Define the Product schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

// Define the Manufacturer schema
const ManufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  products: {
    type: [ProductSchema],  // Array of Product objects
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0;  // Ensure the products array is not empty
      },
      message: 'Products array cannot be empty'
    }
  }
});



// Create the Manufacturer model using the schema
const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);

module.exports = Manufacturer;
