const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 3000,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
};
