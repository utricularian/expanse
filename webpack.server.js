const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/server.js',

  target: 'node',

  externals: [nodeExternals()],

  output: {
    path: path.resolve('server-build'),
    filename: 'server.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /src/,
        use: 'babel-loader'
      }
    ]
  }
};

