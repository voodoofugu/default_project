import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types";
import path from "path";

export function devServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3333,
    open: true,
    historyApiFallback: true,
    hot: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
    },
    static: [
      {
        directory: path.join("src/img"),
        publicPath: "/img/",
      },
      {
        directory: path.join("src/style"),
        publicPath: "/style/",
      },
    ],
  };
}
