"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default config directory
 */
const DEFAULT_BASE_DIR = 'config';
/**
 * Returns the base path for loading the configurations.
 */
exports.baseConfigPath = (process) => {
    return process.env['NODE_CONFIG_TS_DIR'] || DEFAULT_BASE_DIR;
};
