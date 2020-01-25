const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
    title: String,
    shortened_code: String,
    url: String,
    public_link: String,
    user_browser: String,
    operating_system: String,
    bytes: Number,
    format: String,
    width: Number,
    height: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('asset', assetSchema);