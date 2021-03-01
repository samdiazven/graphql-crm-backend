const mongoose = require('mongoose');


const OrderSchema = mongoose.Schema({

  order: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clients',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  status: {
    type: String,
    default: "PENDIENTE"
  },
  created: {
    type: Date,
    default: Date.now()
  }
});


module.exports = mongoose.model('orders', OrderSchema);
