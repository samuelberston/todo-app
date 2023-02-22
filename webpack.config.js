const path = require('path');

const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './client/src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: path.join(__dirname, './node_modules/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    fallback: {
      "buffer": require.resolve("buffer/"),
      "util": require.resolve("util/"),
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
    }
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
