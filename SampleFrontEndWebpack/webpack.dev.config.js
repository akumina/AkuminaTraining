const path = require('path');
const webpack = require('webpack');

var sampleConfig = {
  name: "core",
  entry: './src/js/library/sample.library.dev.js',
  output: {
    filename: 'sample.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: ['Sample'],
    libraryTarget: 'var',
    publicPath: './dist/',
  },
  externals: {
    "jquery": "jQuery"
  },
  resolve: {
    alias: {
      'srcjs': path.join(__dirname, 'src/js')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

  ],
  module: {
    rules: [
      {
        test: /modernizr/,
        loader: "imports-loader?this=>window!exports?window.Modernizr"
      }
    ],
  }
}

module.exports = [
  sampleConfig
]
