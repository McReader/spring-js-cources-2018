const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,

    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      },
    }
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
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'entry.bundle.js',
  },

  plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
};
