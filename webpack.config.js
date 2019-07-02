const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('dotenv').config();

const htmlPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: './index.html'
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: './assets/css/style.css'
});

module.exports = {
  entry: './src/index.jsx',
  devtool: 'cheap-eval-source-map',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './src/dist'),
    filename: '[name].bundle.js'
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css'],
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  node: {
    net: 'empty',
    fs: 'empty'
  },
  stats: {
    colors: true,
    reasons: true
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(scss|css|sass)$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: './assets/img/'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: ['html-loader']
      }
    ]
  },
  plugins: [
    cssPlugin,
    htmlPlugin,
  ]
};
