const config = require('./webpack.common.config.js');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

config.module.rules.unshift(
    {
        test: /\.ts$/,
        use: ['awesome-typescript-loader', 'angular2-template-loader', 'angular-router-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
    }
);

config.plugins.push(
    // HTML Webpack Plugin with dev set to true.
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '../src/frontend/index.html.ejs'),
        favicon: path.join(__dirname, '../src/frontend/resources/favicons/favicon.ico'),
        filename: path.join(__dirname, '../target/classes/static/index.html'),
        inject: 'body',
        minify: {
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            collapseWhitespace: true,
            collapseInlineTagWhitespace: true
        },
        chunksSortMode: 'dependency',
        dev: true
    })
);

config.devtool = 'source-map';

module.exports = config;