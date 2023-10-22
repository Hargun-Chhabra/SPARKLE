/**
 * Author : Sakshi Chaitanya Vaidya
 * Banner No : B00917159
 * Email: sakshi.vaidya@dal.ca
 */

const mongoose = require('mongoose');

const productMasterSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    // product_category: {
    //     type: String,
    //     required: true
    // },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_ref_number: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    image_name : {
        type: String,
        required: true
    }
    // image:{
    //     type: String,
    //     required: true
    // }
}, {
    collection: 'product_master'
});

const ProductMaster = mongoose.model('ProductMaster', productMasterSchema);

module.exports = ProductMaster;