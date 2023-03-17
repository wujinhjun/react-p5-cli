'use strict';

var commander = require('commander');
var path = require('node:path');
var chalk = require('chalk');
var fs = require('node:fs');
var ora = require('ora');
var spawn = require('cross-spawn');
var download = require('download-git-repo');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);
var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);

const existFolder = async (name) => {
  const appPath = path__namespace.join(process.cwd(), name);
  return new Promise((resolve, reject) => {
    const spinner = ora();
    spinner.text = chalk.blueBright(`We will create a folder called ${name} in ${appPath}, please wait a moment`);
    spinner.start();
    if (fs__namespace.existsSync(appPath)) {
      spinner.text = chalk.bgRed(`the folder ${name} existed in the ${appPath}`);
      spinner.fail();
      reject(new Error("folder existed"));
    } else {
      spinner.succeed();
      resolve(0);
    }
  });
};
const downloadRepo = async (remoteRepo, projectName) => {
  return new Promise((resolve, reject) => {
    const spinner = ora();
    spinner.text = chalk.blueBright(`We will download the template from github`);
    spinner.start();
    download(`direct:${remoteRepo}`, projectName, { clone: true }, (err) => {
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
    });
  });
};
const loadCommand = async (name, command, text, options) => {
  const spinner = ora();
  spinner.text = chalk.blueBright(`${text}, please wait a moment`);
  spinner.start();
  return new Promise((resolve, reject) => {
    if (!fs__namespace.existsSync(path__namespace.join(name, "package.json"))) {
      spinner.text = chalk.red(`${text} failed`);
      spinner.fail();
      reject(new Error("no package.json"));
    } else {
      const load = spawn(command, options ?? [], {
        cwd: name,
        stdio: "inherit"
      });
      load.once("close", (code) => {
        if (code !== 0) {
          spinner.text = chalk.red(`${text} failed`);
          spinner.fail();
          reject(new Error("failed installing"));
        }
        spinner.text = chalk.green(`${text} succeed`);
        spinner.succeed();
        resolve(0);
      });
    }
  });
};

const congratulation = (projectName, projectPath) => {
  console.log();
  console.log(`Success! Created ${projectName} at ${projectPath}`);
  console.log("I suggest that you begin by typing:");
  console.log();
  console.log(chalk.blueBright(`	cd ${projectName}`));
  console.log(chalk.blueBright(`	npm install`));
  console.log(chalk.blueBright(`	npm run start`));
  console.log();
  console.log("Happy creative coding!");
  return 0;
};
const create = async (projectName = "p5-react", remote = "https://github.com/wujinhjun/react-p5-scaffold.git#main") => {
  const projectPath = path.join(process.cwd(), projectName);
  try {
    await existFolder(projectName);
    await downloadRepo(remote, projectName);
    await loadCommand(projectPath, "git", "git will initializing the repository", ["init"]);
    await loadCommand(projectPath, "npm", "npm installing dependencies", [
      "install"
    ]);
    return congratulation(projectName, projectPath);
  } catch (error) {
    const err = error;
    let errMessage = "";
    if (err.message) {
      errMessage = err.message;
      console.log(err);
    }
    console.log(`${chalk.bgRedBright("create failed")}: ${chalk.redBright("See above for more details.")}`);
    throw new Error(errMessage);
  }
};

const program = new commander.Command();
const actions = {
  create: {
    description: "create a new project",
    usages: ["r-p5 create project-name"],
    alias: "c"
  }
};
Object.keys(actions).forEach((action) => {
  program.command(action).description(actions[action].description).alias(actions[action].alias).action(() => {
    switch (action) {
      case "create":
        create(process.argv[3]);
        break;
    }
  });
});
program.parse(process.argv);
