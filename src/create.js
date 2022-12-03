import chalk from "chalk";
import ora from "ora";

import init from "./init";

import { existFolder, downloadRepo } from "./utils"

const create = async (projectName = "p5-react") => {
    existFolder(projectName).then(() => {
        console.log(`Creating a new app in ${process.cwd()}\\${projectName}\n`);
        const remote = "direct:https://github.com/wujinhjun/react-p5-scaffold.git#main"
        const loading = ora("downloading");
        loading.start();
        downloadRepo(remote, projectName)
            .then(() => {
                loading.succeed(chalk.green("download template successful"));
                console.log();
                // console.log("I suggest that you begin by typing:");
                // console.log();
                // console.log(chalk.blueBright(`\tcd ${projectName}`));
                // console.log(chalk.blueBright(`\tr-p5 init`));
                // console.log(chalk.blueBright(`\tnpm run start`));
                // console.log();
                // console.log("Happy creative coding!");
            }, (err) => {
                console.log(err);
                loading.fail("failed");
            })
            .then(() => {
                init(projectName);
            })

    })
}

export default create;