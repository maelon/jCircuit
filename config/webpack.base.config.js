'use strict';

const path = require('path');

const config = {
    entry: path.resolve(__dirname, '../src/jcircuit'),

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'jCircuit.js',
        publicPath: '/assets/', // string
        // the url to the output directory resolved relative to the HTML page
        library: 'jcircuit', 
        libraryTarget: 'umd',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ],
    },

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, '../src')
        ],
        extensions: ['.js', '.json', '.jsx', '.css'],
        alias: {
            'module': 'new-module',
            // alias 'module' -> 'new-module' and 'module/path/file' -> 'new-module/path/file'
            'only-module$': 'new-module',
            // alias 'only-module' -> 'new-module', but not 'module/path/file' -> 'new-module/path/file'
            'module': path.resolve(__dirname, 'app/third/module.js'),
            // alias 'module' -> './app/third/module.js' and 'module/file' results in error
            // modules aliases are imported relative to the current context
        },
    },

    performance: {
        hints: 'warning', // enum
        maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
        assetFilter: function(assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },

    devtool: 'false',

    context: __dirname,

    stats: 'errors-only',
};

module.exports = config;
