'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = async appName => {
    const appPath = (0, _path.join)(process.cwd(), appName);
    const loadCmdCur = (0, _utils.loadCmd)(appPath);

    try {
        let initGit = `rm -rf ./.git && git init`;
        if (_os2.default.platform() === "win32") {
            initGit = `git init`;
        }
        await loadCmdCur(initGit, 'init git');
        await loadCmdCur(`npm install`, 'installing packaging');
    } catch (err) {
        console.log(_logSymbols2.default.error, _chalk2.default.red(`Init failed`));
        console.log(_logSymbols2.default.error, err);
    }
};

exports.default = init;