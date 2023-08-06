"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const lodash_1 = require("lodash");
const product_gateway_mongodb_1 = require("../gateways/product.gateway.mongodb");
const business_exception_1 = require("../domains/business.exception");
const product_duplicated_exception_1 = require("../gateways/product.duplicated.exception");
const product_not_found_exception_1 = require("../gateways/product.not.found.exception");
let ProductService = class ProductService {
    constructor(gateway) {
        this.gateway = gateway;
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            product.dateCreation = new Date();
            return this.gateway.create(product)
                .then((data) => {
                return data;
            })
                .catch((err) => {
                console.error("Error to create the product.", err);
                if (err instanceof product_duplicated_exception_1.ProductDuplicatedException) {
                    throw new business_exception_1.BusinessException("C-001", "The product has already been registered.");
                }
                throw new business_exception_1.BusinessException("C-002", "Error to create the new product.");
            });
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            product.dateModification = new Date();
            return this.gateway.update(product)
                .then((data) => {
                return data;
            })
                .catch((err) => {
                console.error("Error to update the product.", err);
                if (err instanceof product_not_found_exception_1.ProductNotFoundException) {
                    throw new business_exception_1.BusinessException("U-001", "Product not found.");
                }
                throw new business_exception_1.BusinessException("U-002", "Error to update the new product.");
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gateway.findAll()
                .then((data) => {
                return lodash_1.defaultTo(data, []).filter((p) => p.active == true);
            })
                .catch((err) => {
                throw new business_exception_1.BusinessException("R-001", "Error to get the product list.");
            });
        });
    }
    delete(code) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.gateway.delete(code)
                .then(() => {
                //
            })
                .catch((err) => {
                throw new business_exception_1.BusinessException("D-001", "Error to delete the product.");
            });
        });
    }
};
ProductService.TARGET_NAME = 'product.service';
ProductService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(product_gateway_mongodb_1.ProductMongoGateway.TARGET_NAME)),
    __metadata("design:paramtypes", [Object])
], ProductService);
exports.ProductService = ProductService;
