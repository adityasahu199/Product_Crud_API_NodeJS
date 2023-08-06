"use strict";
/**
 * Created by tushar on 10/01/18.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const R = require("ramda");
const getVarName = R.replace('@@', '');
const hasEnvVar = R.test(/^@@.*$/);
exports.replaceWithEnvVar = (baseConfig, process) => {
    const itar = R.map((value) => {
        if (R.is(Object, value))
            return itar(value);
        if (R.is(String, value) && hasEnvVar(value))
            return process.env[getVarName(value)];
        return value;
    });
    return itar(baseConfig);
};
