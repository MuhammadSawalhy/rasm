/**
 * details:
 * 1. CssExtractPlugin is seperated due to contenthash in the name
 * 2. Here is the Html Plugin, names are the same in both stages
 */
const path = require('path');
// minification will be set at webpack.prod.config;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pugjs/index.pug',
      chunks: ['admin'],
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   use: ['html-loader', 'markup-inline-loader'],
      // },
      {
        test: /\.pug$/,
        use: [
          'markup-inline-loader',
          'raw-loader',
          {
            loader: 'pug-html-loader',
            options: { pretty: true }
          }
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        // scss and css files
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 2. Extract css into files
          'css-loader', // 1. Turns css into commonjs
        ],
      },
      {
        // scss and css files
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turns sass into css
        ],
      },
      {
        // fonsts and images
        test: /\.(svg|png|jpg|gif|eot|ttf|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash:6].[ext]',
            outputPath: 'assets',
          },
        },
      },
    ],
  },
};

let htmlMinifyOption = {
  removeAttributeQuotes: true,
  collapseWhitespace: true,
  removeComments: true,
};

process.env.NODE_ENV === 'production' &&
  (exports.plugins[0].minify = htmlMinifyOption);
