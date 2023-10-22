const mongoose = require('mongoose');
const sorderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    estimatedCost: {
        type: Number,
        require: true
    },
    image: {
        data: Buffer,
        // contentType: String
    },
    image_name : {
        type: String,
        required: true
    }
}, {
    collection: 'special'
  });

  const Special = mongoose.model('Special', sorderSchema);

  module.exports = Special;