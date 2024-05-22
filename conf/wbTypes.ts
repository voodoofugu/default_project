interface BuildPaths {
  entry: string;
  html: string;
  public: string;
  output: string;
  src: string;
}

type BuildMode = "production" | "development";
type BuildPlatform = "mobile" | "desktop";

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  platform: BuildPlatform;
}

export const port: number = 3333;