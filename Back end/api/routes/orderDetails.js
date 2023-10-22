/**
 * Author : Dev Pratap Singh Rajawat
 * Email : dv269119@dal.ca
 */

const express = require('express')
const router = express.Router()
const orders = require('../models/order')


router.post('/addOrder', async (req, res) => {
    console.log("hitting api", req.body)
    const order = new orders({
        orderId: req.body.orderId,
        orderDate: req.body.orderDate,
        customerName: req.body.customerName,
        totalPrice: req.body.totalPrice,
        customerDetails: req.body.customerDetails,
        orderDetails: req.body.orderDetails,
    })
    console.log("order details", order)
    try {
        const neworder = await order.save()
        console.log("new order", neworder)
        res.status(201).json({ message: "New order added", success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

//Api to get order details by orderId
router.get('/orderbyId/:id', getOrder, async (req, res) => {
    res.json(res.order)
})

  async function getOrder(req, res, next) {
    let order
    try {
        order = await orders.find({orderId: req.params.id})
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order Details' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.order = order
    next()
}

//Api to get all orders details for customer by using name (or part of name)
router.get('/orderbyCustomer/:customerName', getOrder, async (req, res) => {
    res.json(res.order)
})

  async function getOrder(req, res, next) {
    let order
    try {
        order = await orders.find({customerName: { $regex: req.params.customerName, $options: 'i' }})
        if (order == null) {
            return res.status(404).json({ message: 'Cannot find order Details' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.order = order
    next()
}
module.exports = router;