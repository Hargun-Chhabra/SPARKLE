const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const special = require('../models/specialorder')
const router = express.Router()
const multer = require('multer');
const fs = require('fs');

const Storage = multer.diskStorage({
    destination: 'public/images',
    
})

const upload = multer({
    storage: Storage
});


router.use(bodyParser.urlencoded({ extended: true }));

router.post('/special', upload.single('image'), async (req, res) => {
    try {
      const { name, address, phone, estimatedCost } = req.body;
      
      const timestamp = Date.now();
    
      const newfile_name = `${timestamp}`;
  
      const Special = new special({ name, address, phone, estimatedCost, image: {
        data: fs.readFileSync('public/images/' + req.file.filename),
        contentType: 'image/png '
    },
    image_name: newfile_name });
      await Special.save();
  
      res.status(201).json({ message: 'Special saved to MongoDB and image saved to disk' });} catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving special to MongoDB' });
      }
});

router.get('/list', async (req, res) => {
    try {
      const specials = await special.find({}, 'name address phone estimatedCost' );
      res.status(200).json(specials);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching specials from MongoDB' });
    }
  });
module.exports = router;

