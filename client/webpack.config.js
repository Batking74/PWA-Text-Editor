const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
      // Generates an HTML file with the links to your generated bundles.
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        title: 'Home'
      }),

      // Generates the Web App Manifest for PWA
      new WebpackPwaManifest({
        name: 'Text Editor',
        fingerprints: false,
        inject: true,
        short_name: 'PWA',
        description: 'Naz PWA',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: './',
        publicPath: './',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons', 'ios'),
          }
        ],
      }),

      // Configures Workbox to use custom service worker file (src-sw.js) and generate the final service worker file (service-worker.js).
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        
        // Rules for CSS loaders and Babel.
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            },
          },
        },
      ],
    },
  };
};