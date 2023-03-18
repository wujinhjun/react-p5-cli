import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import ora from "ora";
import spawn from "cross-spawn";
import download from "download-git-repo";
import {
  FOLDER_EXISTED,
  DOWNLOAD_FAILED,
  MISSING_FILE,
  EXECUTED_FAILED,
} from "./errorMessage";

export const existFolder = async (name: string) => {
  const appPath = path.join(process.cwd(), name);
  return new Promise((resolve, reject) => {
    const spinner = ora();
    spinner.text = chalk.blueBright(
      `We will create a folder called ${name} in ${appPath}, please wait a moment`
    );
    spinner.start();
    if (fs.existsSync(appPath)) {
      spinner.text = chalk.bgRed(
        `the folder ${name} existed in the ${appPath}`
      );
      spinner.fail();
      reject(new Error(FOLDER_EXISTED));
    } else {
      spinner.succeed();
      resolve(0);
    }
  });
};

export const downloadRepo = async (remoteRepo: string, projectName: string) => {
  return new Promise((resolve, reject) => {
    const spinner = ora();
    spinner.text = chalk.blueBright(
      `We will download the template from github`
    );
    spinner.start();
    download(
      `direct:${remoteRepo}`,
      projectName,
      { clone: true },
      (err: Error) => {
        if (err) {
          console.log(err);
          spinner.text = "Download template failed";
          spinner.fail();
          reject(new Error(DOWNLOAD_FAILED));
        } else {
          spinner.text = "Download template successful";
          spinner.succeed();
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
      reject(new Error(MISSING_FILE));
    } else {
      const load = spawn(command, options ?? [], {
        cwd: name,
        stdio: "inherit",
      });

      load.once("close", (code) => {
        if (code !== 0) {
          spinner.text = chalk.red(`${text} failed`);
          spinner.fail();
          reject(new Error(EXECUTED_FAILED));
        }

        spinner.text = chalk.green(`${text} succeed`);
        spinner.succeed();
        resolve(0);
      });
    }
  });
};
