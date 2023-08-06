"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const node_config_ts_1 = require("node-config-ts");
const container_factory_1 = require("./commons/container.factory");
const error_handler_config_factory_1 = require("./commons/error.handler.config.factory");
const express_config_factory_1 = require("./commons/express.config.factory");
const inversify_express_utils_1 = require("inversify-express-utils");
const mongodb_connection_1 = require("./commons/mongodb.connection");
// create server
const server = new inversify_express_utils_1.InversifyExpressServer(container_factory_1.ContainerFactory.create(), null, { rootPath: '/api/products' });
server.setConfig(express_config_factory_1.ExpressConfigFactory.create());
server.setErrorConfig(error_handler_config_factory_1.ErrorHandlerFactory.create());
const app = server.build();
app.listen(node_config_ts_1.config.port, function () {
    console.info('Server is listening on port {}', node_config_ts_1.config.port);
});
exports.default = app;
mongodb_connection_1.DbConnection.initConnection().then((mongod) => {
    mongodb_connection_1.DbConnection.setAutoReconnect();
});
