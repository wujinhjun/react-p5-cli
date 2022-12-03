"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _init = require("./init");

var _init2 = _interopRequireDefault(_init);

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const create = async (projectName = "p5-react") => {
    (0, _utils.existFolder)(projectName).then(() => {
        console.log(`Creating a new app in ${process.cwd()}\\${projectName}\n`);
        const remote = "direct:https://github.com/wujinhjun/react-p5-scaffold.git#main";
        const loading = (0, _ora2.default)("downloading");
        loading.start();
        (0, _utils.downloadRepo)(remote, projectName).then(() => {
            loading.succeed(_chalk2.default.green("download template successful"));
            console.log();
            // console.log("I suggest that you begin by typing:");
            // console.log();
            // console.log(chalk.blueBright(`\tcd ${projectName}`));
            // console.log(chalk.blueBright(`\tr-p5 init`));
            // console.log(chalk.blueBright(`\tnpm run start`));
            // console.log();
            // console.log("Happy creative coding!");
        }, err => {
            console.log(err);
            loading.fail("failed");
        }).then(() => {
            (0, _init2.default)(projectName);
        });
    });
};

exports.default = create;