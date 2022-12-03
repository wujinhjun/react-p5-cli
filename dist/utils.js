"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadCmd = exports.downloadRepo = exports.existFolder = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _ora = require("ora");

var _ora2 = _interopRequireDefault(_ora);

var _downloadGitRepo = require("download-git-repo");

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const existFolder = exports.existFolder = async name => {
    return new Promise(resolve => {
        if (_fs2.default.existsSync(name)) {
            console.log(_logSymbols2.default.error, _chalk2.default.red(`${name} folder exists in the current directory`));
        } else {
            resolve();
        }
    });
};

const downloadRepo = exports.downloadRepo = async (remoteRepo, projectName) => {
    return new Promise((resolve, reject) => {
        (0, _downloadGitRepo2.default)(remoteRepo, projectName, { clone: true }, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const loadCmd = exports.loadCmd = path => async (cmd, text) => {
    const loading = (0, _ora2.default)();
    loading.start(`${text}. Please wait a moment`);
    await exec(cmd, { cwd: path });
    loading.succeed(`${text} succeed`);
};