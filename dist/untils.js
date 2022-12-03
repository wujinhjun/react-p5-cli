"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.existFolder = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _logSymbols = require("log-symbols");

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const existFolder = exports.existFolder = async name => {
    return new Promise(resolve => {
        if (_fs2.default.existsSync(name)) {
            console.log(_logSymbols2.default.error, _chalk2.default.red(`${name} folder exists in the current directory`));
        } else {
            resolve();
        }
    });
};