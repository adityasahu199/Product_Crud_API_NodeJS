"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
class ExpressConfigFactory {
    constructor() { }
    static create() {
        return (app) => {
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(bodyParser.json());
        };
    }
}
exports.ExpressConfigFactory = ExpressConfigFactory;
