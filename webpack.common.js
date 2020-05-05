const path = require('path')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  entry: './src/js/main.js',

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // from all svg images
        // we don't want to include sprite image
        exclude: path.resolve(__dirname, 'src/img/sprite.svg'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'img'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        // from all svg images
        // include only sprite.svg image
        include: path.resolve(__dirname, 'src/img/sprite.svg'),
        use: {
          loader: 'svg-sprite-loader',
          options: {
            extract: true,
            publicPath: '/img/',
            symbolId: (filePath) => path.basename('')
          }
        }
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new FaviconsWebpackPlugin({
      logo: './src/img/favicon.png', // IMPORTANT url has to be set relative if not throws error at yarn build
      prefix: 'img/'
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    })
  ]
}
