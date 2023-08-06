"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const product_1 = require("../domains/product");
const product_duplicated_exception_1 = require("./product.duplicated.exception");
const product_not_found_exception_1 = require("./product.not.found.exception");
let ProductMongoGateway = class ProductMongoGateway {
    create(product) {
        return product_1.default.create(product)
            .then((data) => {
            return data;
        })
            .catch((error) => {
            if (error.code == 11000) {
                throw new product_duplicated_exception_1.ProductDuplicatedException();
            }
            throw error;
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = yield this.findByCode(product.code).then((data) => {
                return data._id;
            });
            return product_1.default.findOneAndUpdate({ _id: id }, product, { new: true })
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw error;
            });
        });
    }
    findByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_1.default.find({ code: code })
                .then((data) => {
                if (data == null || data[0] == undefined) {
                    throw new product_not_found_exception_1.ProductNotFoundException();
                }
                return data[0];
            })
                .catch((error) => {
                throw error;
            });
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return product_1.default.find()
                .then((data) => {
                return data;
            })
                .catch((error) => {
                throw error;
            });
        });
    }
    delete(code) {
        return product_1.default.findOneAndDelete({ code: code })
            .then(() => {
            //
        })
            .catch((error) => {
            throw error;
        });
    }
};
ProductMongoGateway.TARGET_NAME = 'product.mongo.gateway';
ProductMongoGateway = __decorate([
    inversify_1.injectable()
], ProductMongoGateway);
exports.ProductMongoGateway = ProductMongoGateway;
