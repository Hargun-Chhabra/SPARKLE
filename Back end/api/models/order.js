// This code is an adpatation of code provided in the gitrepo: https://github.com/CodeWithHarry/iNotebook-React/blob/master/backend/models/User.js provided by codewitharry
/**
 * Author : Dev Pratap Singh Rajawat
 * Email : dv269119@dal.ca
 */
const mongoose=require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required: true
    },
    orderDate:{
        type:String,
        required: true,
    },
    customerName: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
    customerDetails:{
        type:Object,
        required: true,
    },
    orderDetails:{
        type:Array,
        required: true,
    },
  

})
orderSchema.set('autoIndex', true)

module.exports= mongoose.model("order",orderSchema)
