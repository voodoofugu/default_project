import { ModuleOptions } from "webpack";
import { BuildOptions } from "./wbTypes";

export function loaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const cssLoader = {
    test: /\.(c|sa|sc)ss$/i,
    exclude: /src\/styles\/tailwind\/(?!output\.css)/,
    use: {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: isDev ? "[local]" : "[local]",
        },
      },
    },
  };

  const fileLoader = {
    test: /\.(woff2?|jpe?g|png|webp|gif|svg)$/i,
    use: {
      loader: "file-loader",
      options: {
        name: "[name][ext]",
        outputPath: "assets",
      },
    },
  };

  const esbuildLoader = {
    test: /\.(ts|tsx|js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "esbuild-loader",
      options: {
        loader: "tsx",
        target: "es2015",
      },
    },
  };

  return [cssLoader, fileLoader, esbuildLoader];
}
