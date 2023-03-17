import { join } from "path";
import * as chalk from "chalk";

import { existFolder, downloadRepo, loadCommand } from "./utils";

const congratulation = (projectName: string, projectPath: string): number => {
  console.log();
  console.log(`Success! Created ${projectName} at ${projectPath}`);
  console.log("I suggest that you begin by typing:");
  console.log();
  console.log(chalk.blueBright(`\tcd ${projectName}`));
  console.log(chalk.blueBright(`\tnpm install`));
  console.log(chalk.blueBright(`\tnpm run start`));
  console.log();
  console.log("Happy creative coding!");
  return 0;
};

const create = async (
  projectName = "p5-react",
  remote = "https://github.com/wujinhjun/react-p5-scaffold.git#main"
) => {
  const projectPath = join(process.cwd(), projectName);

  try {
    await existFolder(projectName);
    await downloadRepo(remote, projectName);
    await loadCommand(
      projectPath,
      "git",
      "git will initializing the repository",
      ["init"]
    );
    await loadCommand(projectPath, "npm", "npm installing dependencies", [
      "install",
    ]);
    return congratulation(projectName, projectPath);
  } catch (error: any) {
    const err = error as Error;
    let errMessage = "";

    if (err.message) {
      errMessage = err.message;
      console.log(err);
    }

    console.log(
      `${chalk.bgRedBright("create failed")}: ${chalk.redBright(
        "See above for more details."
      )}`
    );

    throw new Error(errMessage);
  }
};

export default create;
