const path = require('path');
const webpack = require('webpack');

var coreConfig = {
  name: "core",
  entry: './src/js/library/sample.library.js',
  output: {
    filename: 'sample.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: ['Sample'],
    libraryTarget: 'var',
    publicPath: './dist/',
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
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


var sampleWidgetConfig = {
  name: "core",
  entry: './src/js/library/widgets/sample.library.widget.samplewidget.js',
  output: {
    filename: 'sample.core.samplewidget.min.js',
    path: path.resolve(__dirname, 'dist/widgets'),
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
  coreConfig, 
  sampleWidgetConfig
]
