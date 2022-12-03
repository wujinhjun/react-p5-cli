import symbol from 'log-symbols';
import chalk from 'chalk';
import { join } from 'path';

import { loadCmd } from "./utils"

const init = async (appName) => {
    const appPath = join(process.cwd(), appName);
    const loadCmdCur = loadCmd(appPath);

    try {
        await loadCmdCur(`rm -rf ./.git && git init`, 'init git');
        await loadCmdCur(`npm install`, 'installing packaging');
    } catch (err) {
        console.log(symbol.error, chalk.red(`Init failed`));
        console.log(symbol.error, err);
    }
}


export default init;