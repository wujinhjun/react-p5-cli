import { Command } from "commander";
import chalk from "chalk";

import create from "./create";

import * as actionTypes from "./actionTypes";

const program = new Command();

const actions = {
    create: {
        description: "create a new project",
        usages: [
            "r-p5 create your-project-name"
        ],
        alias: 'c',
    }
}

Object.keys(actions).forEach((action) => {
    program
        .command(action)
        .description(actions[action].description)
        .alias(actions[action].alias)
        .action(() => {
            switch (action) {
                case actionTypes.CREATE:
                    create(process.argv[3]);
                    break;
            }
        })
})

program.parse(process.argv);