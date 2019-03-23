const path = require('path');

module.exports = {
  entry: './src/index.jsx',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  mode: 'development',

  module: {
    rules: [
      {
        test: /js?x$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ]
          }
        }
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'entry.bundle.js'
  }
};
