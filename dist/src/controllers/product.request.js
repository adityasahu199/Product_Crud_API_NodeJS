"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductRequest {
    constructor(code, name, price, quantity, active) {
        this.code = code;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.active = active;
    }
}
exports.ProductRequest = ProductRequest;
