import { join } from "path";
import chalk from "chalk";
import ora from "ora";
import process from "process";
import init from "./init";
import installDep from "./installDep";

import { existFolder, downloadRepo } from "./utils";

const create = async (projectName = "p5-react") => {
  existFolder(projectName).then(() => {
    console.log(`Creating a new app in ${join(process.cwd(), projectName)}`);
    const remote = "https://github.com/wujinhjun/react-p5-scaffold.git#main";
    const loading = ora("downloading");
    loading.start();
    downloadRepo(remote, projectName)
      .then(
        () => {
          loading.succeed(chalk.green("download template successful"));
          console.log();
        },
        (err) => {
          console.log(err);
          loading.fail("failed");
          return Promise.reject(err);
        }
      )
      .then(() => {
        return init(projectName);
      })
      // .then(() => {
      //     return installDep(projectName);
      // })
      .then(() => {
        console.log();
        console.log(
          `Success! Created ${projectName} at ${join(
            process.cwd(),
            projectName
          )}`
        );
        console.log("I suggest that you begin by typing:");
        console.log();
        console.log(chalk.blueBright(`\tcd ${projectName}`));
        console.log(chalk.blueBright(`\tnpm install`));
        console.log(chalk.blueBright(`\tnpm run start`));
        console.log();
        console.log("Happy creative coding!");
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  });
};

export default create;
