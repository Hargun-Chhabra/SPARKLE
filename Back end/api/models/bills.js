/**
 * Author : Neha Dadarwla
 * Email : neha.dadarwala@dal.ca
 */

const mongoose = require('mongoose')

const billsSchema = new mongoose.Schema({
    _id: String,
    customerName: {
        type: String,
        require: true
    },
    orderDate: {
        type: Date,
        require: true
    },
    paymentDetails: {
        type: Object
    },
    products: [
        {
            _id: String,
            productName: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],

})

billsSchema.set('autoIndex', true)

module.exports = mongoose.model('bills', billsSchema)