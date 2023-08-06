"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const node_config_ts_1 = require("node-config-ts");
const MongoMemoryServer_1 = require("mongodb-memory-server-core/lib/MongoMemoryServer");
class DbConnection {
    static initConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            let connectionString = `mongodb://${node_config_ts_1.config.mongodb.host}:${node_config_ts_1.config.mongodb.port}/${node_config_ts_1.config.mongodb.database}`;
            yield DbConnection.connect(connectionString);
        });
    }
    static connect(connStr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.NODE_ENV == "test") {
                DbConnection.mongod = new MongoMemoryServer_1.default({
                    instance: {
                        ip: node_config_ts_1.config.mongodb.host,
                        port: parseInt(node_config_ts_1.config.mongodb.port),
                        dbName: node_config_ts_1.config.mongodb.database
                    },
                });
                // ensures MongoMemoryServer is up
                yield DbConnection.mongod.getUri();
            }
            return mongoose.connect(connStr, { useNewUrlParser: true, useFindAndModify: false })
                .then(() => {
                console.log(`Successfully connected to ${connStr}`);
            })
                .catch((error) => {
                console.error("Error connecting to database: ", error);
                return process.exit(1);
            });
        });
    }
    static setAutoReconnect() {
        mongoose.connection.on("disconnected", () => DbConnection.connect(process.env.DB_CONN_STR));
    }
    static disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose.connection.close();
            if (DbConnection.mongod != null) {
                DbConnection.mongod.stop();
            }
        });
    }
}
exports.DbConnection = DbConnection;
