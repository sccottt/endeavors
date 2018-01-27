const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = {

  entry: {
    app: './app/src/entry.js'
  },

  output: {
    path: path.resolve(__dirname, '../app/build'),
    filename: 'resources/scripts/[name].bundle.js'
  },

  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader'
      },

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['react'],
          plugins: ['transform-object-rest-spread'],
        }
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'resources/images/[name].[ext]'
        }
      },

      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'resources/fonts/[name].[ext]'
        }
      },

      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }

    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'node_modules/react/dist/react.js', to: 'resources/scripts/vendor/react/' },
      { from: 'node_modules/react-dom/dist/react-dom.js', to: 'resources/scripts/vendor/react/' },
      { from: 'app/src/assets', to: 'assets/' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'app/src/index.html'
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [
        'resources/scripts/vendor/react/react.js',
        'resources/scripts/vendor/react/react-dom.js'
      ],
      append: false
    })
  ],

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  },

};