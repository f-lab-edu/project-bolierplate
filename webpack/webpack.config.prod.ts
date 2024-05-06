import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { mergeWithRules } from "webpack-merge";

import webpackBaseConfig from "./webpack.config.base";

import type { Configuration } from "webpack";

const webpackProdConfig: Configuration = {
  mode: "production",
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
              plugins: ["transform-remove-console"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VanillaExtractPlugin({
      identifiers: "short",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
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
})(webpackBaseConfig, webpackProdConfig) as Configuration;
