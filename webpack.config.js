const HTMLWebpackPlugin = require('html-webpack-plugin');

// Plugin classes
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body'
})


module.exports = {

  // Path to your entry point. From this file Webpack will begin his work
  entry: './src/account.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },

  plugins: [HTMLWebpackPluginConfig],
  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript
  // minifying and other thing so let's set mode to development
  mode: 'development'
};
