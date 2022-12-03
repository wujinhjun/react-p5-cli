import fs from "fs";
import symbol from "log-symbols";
import chalk from "chalk";
import ora from "ora";
import download from "download-git-repo";

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export const existFolder = async (name) => {
    return new Promise((resolve) => {
        if (fs.existsSync(name)) {
            console.log(symbol.error, chalk.red(`${name} folder exists in the current directory`));
        } else {
            resolve();
        }
    })
}

export const downloadRepo = async (remoteRepo, projectName) => {
    return new Promise((resolve, reject) => {
        download(remoteRepo, projectName, { clone: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

export const loadCmd = (path) => async (cmd, text) => {
    const loading = ora();
    loading.start(`${text}. Please wait a moment`);
    await exec(cmd, { cwd: path });
    loading.succeed(`${text} succeed`);
}