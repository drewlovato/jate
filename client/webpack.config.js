const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    devServer: {
      // The `hot` option is to use the webpack-dev-server in combination with the hot module replacement API.
      hot: "only",
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Hot Module Reloading",
        template: "./src/js/index.html",
      }),
      new InjectManifest({
        swSrc: "./src-sw.js",
      }),
      new WebpackPwaManifest({
        // TODO: Create a manifest.json:
        name: "Just Another Text Editor",
        short_name: "jate",
        description: "Text Editor",
        background_color: "#7eb4e2",
        theme_color: "#7eb4e2",
        fingerprints: false,
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join("images"),
          },
        ],
      }),
    ],
    module: {
      rules: [
        { test: /\.txt$/, use: "raw-loader" },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
    },
  };
};
