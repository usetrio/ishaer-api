const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema({
    title: String,
    shortened_code: String,
    url: String,
    public_link: String,
    browser: String,
    version: String,
    operating_system: String,
    bytes: Number,
    format: String,
    width: Number,
    height: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Asset', assetSchema);