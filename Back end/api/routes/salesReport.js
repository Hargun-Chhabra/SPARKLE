/**
 * Author : Neha Dadarwala
 * Banner No : B00916174
 * Email: neha.dadarwala@dal.ca
 */

const express = require('express')
const router = express.Router()
const orderSchema = require('../models/order');


router.get('/getOrders' , async(req,res) =>{

    orderSchema.find({}, { orderDate: 1, orderId: 1, totalPrice: 1, customerName: 1 }).then(data => {
        console.log(data);
        res.status(200).json({
            message: "Orders Retrived",
            sucess: "true",
            order : data
        })
    }).catch(error => {
        res.status(500).json({
            message: "Failed",
            sucess: "false"
        })
        console.log(error);
    });
})

module.exports = router;