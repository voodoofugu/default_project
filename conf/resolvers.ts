import { Configuration } from "webpack";
import { BuildOptions } from "./types";

export function resolvers(options: BuildOptions): Configuration["resolve"] {
  return {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".css", ".scss", ".json"],
    alias: {
      "@": options.paths.src,
    },
  };
}
