import * as fs from "fs";
import * as path from "path";
import * as symbol from "log-symbols";
import * as chalk from "chalk";
import ora from "ora";

import util from "util";
import spawn from "cross-spawn";
const download = require("download-git-repo");
export const existFolder = async (name: string) => {
  const currentPath = path.join(process.cwd(), name);
  return new Promise((resolve, reject) => {
    if (fs.existsSync(currentPath)) {
      reject(1);
    } else {
      resolve(0);
    }
  });
};

export const downloadRepo = async (remoteRepo: string, projectName: string) => {
  return new Promise((resolve, reject) => {
    download(
      `direct:${remoteRepo}`,
      projectName,
      { clone: true },
      (err: Error) => {
        if (err) {
          console.log(err);
          reject(1);
        } else {
          resolve(0);
        }
      }
    );
  });
};

export const loadCmd = (path: string) => (command: string[], text: string) => {
  //   const loading = ora();
  //   loading.start(`${text}. Please wait a moment`);
  //   spawn(path, command, {
  //     stdio: "inherit",
  //     shell: process.platform === "win32",
  //   });
  //   loading.succeed(`${text}`);
};
