const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const buildFolder = path.resolve(__dirname + '/cordova/www');
const sourceFolder = path.resolve(__dirname + '/src');
module.exports = {
  entry: ['./src/app.js'],
  output: {
    path: buildFolder,
    filename: 'scripts/app.bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(sourceFolder, 'index.html'),
        to: path.resolve(buildFolder, 'index.html'),
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    publicPath: buildFolder,
    contentBase: buildFolder,
    hot: true,
    inline: true,
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      }],
    }, {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=fonts/[name].[ext]',
    }],
  },
};
