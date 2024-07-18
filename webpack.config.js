const path = require('path'); //CommomJS

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'frontend', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map'
};