import webpack, { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import { BuildOptions } from "./wbTypes";

export function plugins({
  mode,
  paths,
  platform,
}: BuildOptions): Configuration["plugins"] {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const pluginsConf: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
      __ENV__: JSON.stringify(mode),
    }),
  ];

  if (isDev) {
    pluginsConf.push(new webpack.ProgressPlugin());
    pluginsConf.push(new ForkTsCheckerWebpackPlugin());
    pluginsConf.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    pluginsConf.push(new webpack.ProgressPlugin());
  }

  return pluginsConf;
}
