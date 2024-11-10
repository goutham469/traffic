// middleware/compress.js
const compression = require('compression');

const compress = (req, res, next) => {
    // Use the compression middleware for the response
    compression()(req, res, next);
};

module.exports = compress;
