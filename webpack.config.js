const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const distDir = path.join(__dirname, './dist');

module.exports = {
  entry: {
    main: ['./src/main.tsx'],
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
        test: /\.(jsx?|tsx?)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'awesome-typescript-loader',
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
