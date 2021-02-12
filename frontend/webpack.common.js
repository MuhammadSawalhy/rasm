/**
 * details:
 * 1. CssExtractPlugin is seperated due to contenthash in the name
 * 2. Here is the Html Plugin, names are the same in both stages
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/js/index.js',
  },
  output: {
    publicPath: '',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pugjs/index.pug',
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
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 2. Extract css into files
          'css-loader', // 1. Turns css into commonjs
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // 3. Extract css into files
          'css-loader', // 2. Turns css into commonjs
          'sass-loader', // 1. Turns sass into css
        ],
      },
      // fonsts and images
      {
        test: /\.(svg|png|jpg|gif|eot|otf|ttf|woff2?(\?v=[0-9]\.[0-9]\.[0-9])?)$/,
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
