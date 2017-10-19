const webpack = require('webpack');
const path = require('path');
const webpackConfig = require('../index');
const IP = webpackConfig.getIp();
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'assets/[name].[hash].js',
  },
  module: {
    rules: webpackConfig.styleLoaders({sourceMap: false, extract: false,}).concat([
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: [path.resolve('src')],
      //   exclude: /node_modules/,
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: webpackConfig.loaders
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]?[hash]'
        }
      }
    ])
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      src: resolve('src'),
      views: resolve('src/views'),
      components: resolve('src/components'),
      assets: resolve('src/assets'),
    }
  },
  devServer: {
    host: IP,
    // https: true,
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    // http://mobilesite.github.io/2017/02/18/all-the-errors-encountered-in-webpack/
    // https://segmentfault.com/q/1010000008716379
    new ExtractTextPlugin({
      disable: true,
      filename: path.posix.join('static', 'css/[name].[hash].css')
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html',
      chunks: ['app'],
      showErrors: true,
      hash: true,
      inject: true,
      chunksSortMode: 'dependency'
    }),
  ],
}