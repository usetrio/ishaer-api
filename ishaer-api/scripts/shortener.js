const validUrl = require('valid-url');
const shortId =  require('shortid');
const assetModel = require('../models/asset');

const shortener = async (assetInfo, baseUrl) => {
    /* Checking if the base URL is valid */
    if(!validUrl.isUri(baseUrl)) {
        return {
            success: false,
            error: {
                message: 'The base URL is not valid!',
                http_code: 401
            }
        };
    }

    /* Creating the unique code for the short URL */
    const urlCode = shortId.generate();

    try {
        let asset = await assetModel.findOne({ url: assetInfo.url });

        /* Checking if the URL is already in the database */
        if(asset) {
            return {
                success: true,
                asset
            };
        }

        /* Creating the new URL */
        const shortedUrl = `${baseUrl}/${urlCode}`;


        /* Preparing the model to be inserted */
        asset = new assetModel({
            title: assetInfo.title,
            shortened_code: urlCode,
            url: assetInfo.url,
            public_link: shortedUrl,
            browser: assetInfo.browser,
            version: assetInfo.version,
            operating_system: assetInfo.operating_system,
            bytes: assetInfo.bytes,
            format: assetInfo.format,
            width: assetInfo.width,
            height: assetInfo.height,
            created_at: assetInfo.created_at
        });

        await asset.save();

        return {
            success: true,
            asset
        };
    }
    catch(error) {
        console.error(error);
        return {
            success: false,
            error: {
                message: 'Error in the shortener algorithm!',
                http_code: 500
            }
        };

    }
}

module.exports = shortener;