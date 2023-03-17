import { Command } from "commander";

import create from "./create";

const program = new Command();

interface IAction {
  [key: string]: {
    description: string;
    usages: string | string[];
    alias: string;
  };
}

const actions: IAction = {
  create: {
    description: "create a new project",
    usages: ["r-p5 create project-name"],
    alias: "c",
  },
};

Object.keys(actions).forEach((action) => {
  program
    .command(action)
    .description(actions[action].description)
    .alias(actions[action].alias)
    .action(() => {
      switch (action) {
        case "create":
          create(process.argv[3]);
          break;
      }
    });
});

program.parse(process.argv);
