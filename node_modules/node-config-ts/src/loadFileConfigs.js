"use strict";
///<reference path="../global.d.ts"/>
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by tushar on 30/12/17.
 */
const fs = require("fs");
const R = require("ramda");
const configPaths_1 = require("./configPaths");
/**
 * Loads the configs provided in the {ConfigPaths}
 * If no config is found then an empty config is returned.
 * @param process {Process}
 * @return {defaultConfig, envConfig, deploymentConfig, userConfig}
 */
exports.loadFileConfigs = (process) => {
    const itar = R.mapObjIndexed(R.ifElse(fs.existsSync, require, R.always({})));
    return itar(configPaths_1.configPaths(process));
};
