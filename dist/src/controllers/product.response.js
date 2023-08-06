"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductResponse {
    constructor(product) {
        this.code = product.code;
        this.name = product.name;
        this.price = product.price;
        this.quantity = product.quantity;
    }
}
exports.ProductResponse = ProductResponse;
