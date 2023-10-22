/**
 * Author : Sakshi Chaitanya Vaidya
 * Banner No : B00917159
 * Email: sakshi.vaidya@dal.ca
 */

const mongoose = require('mongoose');

const categoryMasterSchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    short_name: {
        type: String,
        required : true
    }
}, {
    collection: 'category_master'
});

const CategoryMaster = mongoose.model('CategoryMaster', categoryMasterSchema);

module.exports = CategoryMaster;