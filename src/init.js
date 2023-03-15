import { join } from "path";
import os from "os";
import symbol from "log-symbols";
import chalk from "chalk";
import process from "process";

import { loadCmd } from "./utils";

const init = async (appName) => {
  const appPath = join(process.cwd(), appName);
  const loadCmdCur = loadCmd(appPath);

  try {
    let initGit = `rm -rf ./.git && git init`;
    if (os.platform() === "win32") {
      initGit = `git init`;
    }
    await loadCmdCur(
      initGit,
      chalk.green("git repository initialize successfully")
    );
  } catch (err) {
    console.log(symbol.error, chalk.red(`Init failed`));
    console.log(symbol.error, err);
  }
};

export default init;
