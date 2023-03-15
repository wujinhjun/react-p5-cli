import * as fs from "fs";
import * as path from "path";
import * as symbol from "log-symbols";
import * as chalk from "chalk";
import * as ora from "ora";
import * as spawn from "cross-spawn";

import * as download from "download-git-repo";

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

export const loadCommand = async (
  name: string,
  command: string,
  text: string,
  options?: string[]
) => {
  const spinner = ora();
  spinner.text = chalk.blueBright(`${text}, please wait a moment`);
  spinner.start();

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(path.join(name, "package.json"))) {
      spinner.text = chalk.red(`${text} failed`);
      spinner.fail();
      reject(2);
    } else {
      const load = spawn(command, options ?? [], {
        cwd: name,
        stdio: "inherit",
      });

      load.once("close", (code) => {
        if (code !== 0) {
          spinner.text = chalk.red(`${text} failed`);
          spinner.fail();
          reject(1);
        }

        spinner.text = chalk.green(`${text} succeed`);
        spinner.succeed();
        resolve(0);
      });

      load.once("error", () => {
        spinner.text = chalk.red(`${text} failed`);
        spinner.fail();
        reject(1);
      });
    }
  });
};
