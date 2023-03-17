import * as fs from "fs";
import * as path from "path";
import * as chalk from "chalk";
import * as ora from "ora";
import * as spawn from "cross-spawn";
import * as download from "download-git-repo";

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
      reject(new Error("folder existed"));
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
          reject(new Error("download failed"));
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
      reject(new Error("no package.json"));
    } else {
      const load = spawn(command, options ?? [], {
        cwd: name,
        stdio: "inherit",
      });

      load.once("close", (code) => {
        if (code !== 0) {
          spinner.text = chalk.red(`${text} failed`);
          spinner.fail();
          reject("failed installing");
        }

        spinner.text = chalk.green(`${text} succeed`);
        spinner.succeed();
        resolve(0);
      });
    }
  });
};
