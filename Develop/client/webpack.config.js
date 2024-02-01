const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: 'bundle.bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
      // Generates an HTML file with the links to your generated bundles.
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),

      // Generates the Web App Manifest for your PWA, including configuration for icons and other metadata.
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'PWA',
        description: 'Naz PWA',
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: '/',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons', 'ios'),
          },
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [120, 152, 167, 180],
            destination: path.join('icons', 'ios'),
            ios: true,
          },
        ],
      }),

      // Configures Workbox to use your custom service worker file (src-sw.js) and generate the final service worker file (service-worker.js).
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        
        // Rules for CSS loaders and Babel. This assumes you'll use style-loader and css-loader for CSS and babel-loader for JavaScript.
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};