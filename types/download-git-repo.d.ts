declare module "download-git-repo" {
  namespace download {
    interface Options {
      clone: boolean;
    }
  }
  function download(
    direct: string,
    dest: string,
    options: download.Options,
    callback: (err: Error) => void
  ): void;
  export = download;
}
