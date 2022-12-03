'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _path = require('path');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = async appName => {
    const appPath = (0, _path.join)(process.cwd(), appName);
    const loadCmdCur = (0, _utils.loadCmd)(appPath);

    try {
        await loadCmdCur(`rm -rf ./.git && git init`, 'init git');
        // await loadCmdCur(``);
        // await loadCmd(`git init`, appPath)
        await loadCmdCur(`npm install`, 'installing packaging');
    } catch (err) {
        console.log(_logSymbols2.default.error, _chalk2.default.red(`Init failed`));
        console.log(_logSymbols2.default.error, err);
    }
};

exports.default = init;