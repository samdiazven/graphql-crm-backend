const mongoose = require('mongoose');

const ProductsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    require: true,
    trim : true
  },
  price: {
    type: Number,
    require: true,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

ProductsSchema.index({name: 'text'});

module.exports = mongoose.model('products', ProductsSchema);
