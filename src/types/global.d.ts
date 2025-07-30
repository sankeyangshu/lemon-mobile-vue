/** Build app info of the project */
declare const __APP_INFO__: {
  lastBuildTime: string;
  pkg: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    name: string;
    version: string;
  };
};

interface ImportMeta {
  readonly env: Env.ImportMeta;
}
