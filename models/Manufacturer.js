const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});


const ManufacturerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  city: { type: String, required: true },
  products: {
    type: [ProductSchema],  
    required: true,
    validate: {
      validator: function(arr) {
        return arr.length > 0;  
      },
      message: 'Products array cannot be empty'
    }
  }
});




const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema);

module.exports = Manufacturer;
