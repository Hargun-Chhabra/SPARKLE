const mongoose = require('mongoose');


const repairSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    bag: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    cost: {
        type: Number,
        require: true
    },
    status:{
        type: String,
        require:true
    },
    instruction: {
        type: String ,
        require: true
    }
}, {
    collection: 'repairs'
  });

  const Repair = mongoose.model('Repair', repairSchema);

  module.exports = Repair;