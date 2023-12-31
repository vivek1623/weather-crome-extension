const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = {
  entry: {
    popup: path.resolve("src/popup/popup.tsx"),
    options: path.resolve("src/options/options.tsx"),
    background: path.resolve("src/background/background.ts"),
    contentScript: path.resolve("src/contentScript/contentScript.tsx"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
      {
        type: "asset/resource",
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      },
    ],
  },
  plugins: [
    new Dotenv({
      safe: true,
      allowEmptyValues: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve("src/static"), to: path.resolve("dist") },
      ],
    }),
    new HtmlWebpackPlugin({
      title: "Weather Popup",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      title: "Weather Options",
      filename: "options.html",
      chunks: ["options"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "contentScript"
      },
    },
  },
}
