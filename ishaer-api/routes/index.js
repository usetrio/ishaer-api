/* Adding the configuration file to the app. */
require('dotenv').config();

const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const dbConnection = require('../config/db');
const shortener = require('../scripts/shortener');
const assetModel = require('../models/asset');
const baseUrl = process.env.BASE_URL;

dbConnection();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'iShaer' });
});

/* POST upload asset endpoint. */
router.post('/upload', (req, res, next) => {
  try {
    /* Get the asset from the body of the request */
    const asset = req.files.asset;

    /* Take the name of the asset spliting the string by the last dot getting the extension. */
    let assetTitle = asset.name.split(/\.(?=[^\.]+$)/)[0];

    /* Upload asset to Cloudinary */
    cloudinary.uploader.upload(asset.tempFilePath, async (err, result) => {
      if(err) {
        res.render('error', { 
          message: 'An error ocurred!',
          err
        });

        res.send({
          success: false,
          error: err
        });
      }
      else {
        /* Building asset information */
        let assetInfo = {
          title: assetTitle,
          url: result.url,
          browser: req.useragent.browser,
          version: req.useragent.version,
          operating_system: req.useragent.os,
          bytes: result.bytes,
          format: result.format,
          width: result.width,
          height: result.height,
          created_at: new Date()
        }

        assetInfo = await shortener(assetInfo, baseUrl);

        console.log(assetInfo);
        res.send(assetInfo);
      }
    });
  }
  catch(error) {
    console.error(error);

    res.render('error', { 
      message: 'An error ocurred uploading the asset!',
      error
    });
  }
});

/* GET redirect to Cloudinary asset URL */
router.get('/:code', async (req, res, next) => {
  try {
    const asset = await assetModel.findOne({ 
      shortened_code: req.params.code 
    });

    if(asset) {
      return res.redirect(asset.url);
    }

    return res.status(404).json('No URL found!');
    
  }
  catch(error) {
    console.error(error);

    res.render('error', { 
      message: 'An error ocurred getting the URL!',
      error
    });
  }
});

module.exports = router;
