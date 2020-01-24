const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;

require('dotenv').config();

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
  /* Get the asset from the body of the request */
  const asset = req.files.asset;

  console.log(req.headers);
  console.log(req.useragent);

  /* Take the name of the asset spliting the string by the last dot getting the extension. */
  let assetTitle = asset.name.split(/\.(?=[^\.]+$)/)[0];

  /* Upload asset to Cloudinary */
  cloudinary.uploader.upload(asset.tempFilePath, (err, result) => {
    if(err) {
      console.log(err);

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
      console.log(result);

      res.send({
        success: true,
        asset: {
          id: result.public_id,
          title: assetTitle,
          url: result.url,
          bytes: result.bytes,
          format: result.format,
          width: result.width,
          height: result.height,
          created_at: result.created_at
        }
      });
    }
  });
});

module.exports = router;
