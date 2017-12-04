const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const distDir = path.join(__dirname, './dist');

module.exports = {
  entry: {
    main: ['babel-polyfill', './src/main.jsx'],
  },
  output: {
    filename: '[name].[hash].js',
    path: distDir,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            presets: ['react-app'],
          },
        }],
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }],
      }
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CleanWebpackPlugin([distDir]),
  ],
};
