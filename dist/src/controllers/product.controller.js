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
require("reflect-metadata");
const express = require("express");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const product_service_1 = require("../usecases/product.service");
const product_response_1 = require("./product.response");
let ProductController = class ProductController {
    constructor(service) {
        this.service = service;
    }
    getAll(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield this.service.getAll();
            let productsReponse = products.map(p => new product_response_1.ProductResponse(p));
            response.send(productsReponse);
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = request.body;
            yield this.service.create(product);
            response.sendStatus(201);
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = request.body;
            yield this.service.update(product);
            response.sendStatus(204);
        });
    }
    delete(code, response) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.service.delete(code);
            response.sendStatus(204);
        });
    }
};
ProductController.TARGET_NAME = 'product.controller';
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    inversify_express_utils_1.httpPost('/', 'SecurityFilterMiddleware'),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    inversify_express_utils_1.httpPut('/', 'SecurityFilterMiddleware'),
    __param(0, inversify_express_utils_1.request()),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    inversify_express_utils_1.httpDelete('/:code', 'SecurityFilterMiddleware'),
    __param(0, inversify_express_utils_1.requestParam("code")),
    __param(1, inversify_express_utils_1.response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
ProductController = __decorate([
    inversify_express_utils_1.controller(''),
    __param(0, inversify_1.inject(product_service_1.ProductService.TARGET_NAME)),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
