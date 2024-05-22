import webpack from "webpack";
import { devServer } from "./devServer";
import { loaders } from "./loaders";
import { optimization } from "./optimization";
import { plugins } from "./plugins";
import { resolvers } from "./resolvers";
import { BuildOptions } from "./wbTypes";

export function webpackSett(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
    optimization: optimization(options),
    plugins: plugins(options),
    module: {
      rules: loaders(options),
    },
    resolve: resolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : false,
    devServer: isDev ? devServer(options) : undefined,
  };
}
