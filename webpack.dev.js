const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development', // Stops minifying webpack JS bundle
  devtool: 'none', // Simplify outputted bundle code for reader when development
  output: {
    filename: 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    contentBase: 'dist',
    open: true, // Tells dev-server to open the browser after server had been started
    overlay: true, // Shows a full-screen overlay with errors or warnings
    hot: false // update changes without full refresh in the browser
  },

  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 1200 // Add a delay before rebuilding once the first file changed
  },

  module: {
    rules: [
      {
        test: [/.css$|.scss$/],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contentHash].css',
      chunkFilename: 'css/[id].css'
    })
  ]
})
