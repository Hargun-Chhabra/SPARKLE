/**
 * Author : Neha Dadarwla
 * Email : neha.dadarwala@dal.ca
 */

const express = require('express')
const router = express.Router()
const bills = require('../models/bills')
const orders = require('../models/order')
const ProductMaster = require('../models/product_master');

router.get('/find/:id', getBill, async (req, res) => {
    res.json(res.bill)
})

router.post('/newRefund', updateInventory, async (req, res) => {
    const bill = new bills({
        _id: req.body._id,
        customerName: req.body.customerName,
        orderDate: req.body.orderDate,
        products: req.body.products,
    })
    try {
        const newbill = await bill.save()
        res.status(201).json({ message: "New Refund Bill Created", success: true })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
})

async function getBill(req, res, next) {
    let bill
    try {
        bill = await orders.find({ orderId: req.params.id })
        if (bill.length == 0) {
            return res.status(404).json({ message: 'Cannot find bill' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.bill = bill
    next()
}

async function updateInventory(req, res, next) {
    let products = req.body.products
    try {
        for (let i = 0; i < products.length; i++) {
            const product = await ProductMaster.findById(products[i]._id)
            let quantity = product.qty + 1
            product.qty = quantity
            await product.save()
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    next()
}

module.exports = router;