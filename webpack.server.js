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
        use: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'css-loader',
            options: { modules: true }
          },
          {
            loader: 'sass-loader',
            options: {modules: true}
          }
        ]
      }
    ]
  }
};

