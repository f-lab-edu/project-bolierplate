import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import { mergeWithRules } from "webpack-merge";

import webpackBaseConfig from "./webpack.config.base";

import type { Configuration } from "webpack";

const webpackDevConfig: Configuration = {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-typescript",
                ["@babel/preset-react", { runtime: "automatic" }],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VanillaExtractPlugin({
      identifiers: "debug",
    }),
  ],
};

export default mergeWithRules({
  module: {
    rules: {
      test: "match",
      use: {
        loader: "match",
        options: "replace",
      },
    },
  },
})(webpackBaseConfig, webpackDevConfig) as Configuration;
