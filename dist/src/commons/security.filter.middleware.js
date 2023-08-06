"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_config_ts_1 = require("node-config-ts");
class SecurityFilterMiddlewareFactory {
    constructor() { }
    static create() {
        return (req, res, next) => {
            let token = req.headers["authorization"];
            if (node_config_ts_1.config.security.token !== token) {
                res.status(401).json();
                return;
            }
            next();
        };
    }
}
exports.SecurityFilterMiddlewareFactory = SecurityFilterMiddlewareFactory;
