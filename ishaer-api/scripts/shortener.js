const validUrl = require('valid-url');
const shortId =  require('shortid');
const assetModel = require('../models/asset');

const shortener = async (assetInfo, baseUrl) => {
    if(!validUrl.isUri(baseUrl)) {
        return {
            success: false,
            error: {
                message: 'The base URL is not valid!',
                http_code: 401
            }
        };
    }

    const urlCode = shortId.generate();

    try {
        let asset = await assetModel.findOne({ url: assetInfo.url });

        if(asset) {
            return {
                success: true,
                asset
            };
        }

        const shortedUrl = `${baseUrl}/${urlCode}`;

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