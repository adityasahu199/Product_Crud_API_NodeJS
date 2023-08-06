"use strict";
/**
 * Created by tushar on 30/12/17.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require("minimist");
const R = require("ramda");
/**
 * Loads config from the command line
 * @param process
 * @return {{cliConfig: any}}
 */
exports.loadCLIConfigs = (process) => {
    return R.omit(['_'], minimist(process.argv));
};
