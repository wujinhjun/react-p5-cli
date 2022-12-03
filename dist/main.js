"use strict";

var _commander = require("commander");

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _create = require("./create");

var _create2 = _interopRequireDefault(_create);

var _actionTypes = require("./actionTypes");

var actionTypes = _interopRequireWildcard(_actionTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const program = new _commander.Command();

const actions = {
    create: {
        description: "create a new project",
        usages: ["r-p5 create your-project-name"],
        alias: 'c'
    }
};

Object.keys(actions).forEach(action => {
    program.command(action).description(actions[action].description).alias(actions[action].alias).action(() => {
        switch (action) {
            case actionTypes.CREATE:
                (0, _create2.default)(process.argv[3]);
                break;
        }
    });
});

program.parse(process.argv);