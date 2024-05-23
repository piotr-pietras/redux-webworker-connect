const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // filename: "./public/index.html",
      // inject: true,
    }),
  ],
  // entry: {
  //   workerDeps: {
  //     entry: "./src/serices/redux/worker.deps.ts",
  //     output: "[name].chunk.js",
  //   },
  // },
  // entry: {
    // home: "./src/index.tsx",
    // "worker-deps": { import: "./src/worker.deps.ts", filename: "[name].js" },
  // },
  output: {
    filename: "[chunkhash].chunk.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
