const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary');

require('dotenv').config();

cloudinary.config({
  cloudName: process.env.CLOUD_NAME,
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'iShaer' });
});

module.exports = router;
