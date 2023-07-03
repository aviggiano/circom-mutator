const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {
  NODE_ENV = 'production',
} = process.env;
module.exports = {
  entry: './src/bin.ts',
  mode: NODE_ENV,
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bin.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
  externals: [ nodeExternals() ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
}
