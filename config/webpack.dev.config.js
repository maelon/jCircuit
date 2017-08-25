'use strict';

const path = require('path');
const config = require('./webpack.base.config');

config.devServer = {
    contentBase: path.join(__dirname, '../src'),
    compress: true,
    noInfo: true,
}

module.exports = config;
