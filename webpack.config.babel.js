/* eslint-disable no-undef */
import path from 'path';
const webpack = require('webpack')

export default {
    entry: {
      test: path.join(__dirname, 'main.js'),
      highlight: path.join(__dirname, './tools/highlight/main.js'),
      arrayStyle: path.join(__dirname, './tools/findArray/main.js'),
      sentences: path.join(__dirname, './tools/compromise/main.js'),
      emoji: path.join(__dirname, './tools/emojicount/main.js'),
      haha: path.join(__dirname, './tools/haha/main.js'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.scss$/,
            use: [
                {
                loader: "style-loader" // creates style nodes from JS strings
                },
                {
                loader: "css-loader" // translates CSS into CommonJS
                },
                {
                loader: "sass-loader" // compiles Sass to CSS
                }
            ]
        },
        {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        }],
    },
    // resolve: {
    //     alias: {
    //       three$: 'three/build/three.min.js',
    //       'three/.*$': 'three',
    //     },
    // },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //       THREE: 'three',
    //     }),
    // ],
    devtool: 'source-map',
    mode: 'development',
    watch: true,
};