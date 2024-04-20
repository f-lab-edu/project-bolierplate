import path from "path";

import { VanillaExtractPlugin } from "@vanilla-extract/webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { Configuration } from "webpack";

import "webpack-dev-server";

const getBabelConfig = (mode: Configuration["mode"]) => {
  return mode === "production"
    ? {
        presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]],
        plugins: ["transform-remove-console"],
      }
    : {
        presets: ["@babel/preset-env", "@babel/preset-typescript", ["@babel/preset-react", { runtime: "automatic" }]],
      };
};

const webpackConfig = (env: unknown, args: { mode: Configuration["mode"] }): Configuration => {
  const { mode } = args;

  return {
    entry: "./src/main.tsx",
    mode,
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[contenthash].bundle.js",
      clean: true,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: getBabelConfig(mode),
            },
          ],
        },
        {
          test: /\.vanilla\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve("css-loader"),
              options: {
                url: false,
              },
            },
            "postcss-loader",
          ],
        },
      ],
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: "./index.html",
        hash: true,
        cache: true,
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
      }),
      new VanillaExtractPlugin({
        identifiers: mode === "development" ? "debug" : "short",
      }),
      new MiniCssExtractPlugin(),
    ],
  };
};

export default webpackConfig;
