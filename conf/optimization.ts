import { Configuration } from "webpack";
import { EsbuildPlugin } from "esbuild-loader";
import { BuildOptions } from "./wbTypes";

export function optimization({
  mode,
}: BuildOptions): Configuration["optimization"] {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const optimizationConf: Configuration["optimization"] = {
    minimizer: [],
  };

  if (isDev) {
  }

  if (isProd) {
    (optimizationConf.minimizer ??= []).push(
      new EsbuildPlugin({
        target: "es2015",
      })
    );
  }

  return optimizationConf;
}
