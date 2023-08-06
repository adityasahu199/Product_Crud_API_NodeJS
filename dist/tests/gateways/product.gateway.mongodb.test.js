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
require("reflect-metadata");
const chai = require("chai");
const lodash_1 = require("lodash");
const product_gateway_mongodb_1 = require("../../src/gateways/product.gateway.mongodb");
const product_1 = require("../../src/domains/product");
const mongodb_connection_1 = require("../../src/commons/mongodb.connection");
const product_not_found_exception_1 = require("../../src/gateways/product.not.found.exception");
const expect = chai.expect;
const assert = chai.assert;
const gateway = new product_gateway_mongodb_1.ProductMongoGateway();
describe("Products mongo gateway", () => __awaiter(this, void 0, void 0, function* () {
    before(() => __awaiter(this, void 0, void 0, function* () {
        yield mongodb_connection_1.DbConnection.initConnection();
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        yield mongodb_connection_1.DbConnection.disconnect();
    }));
    // Before each method we need to truncate all products from db
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        product_1.default.deleteMany({}).then();
    }));
    it("Should create a product sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Given
        let dateCreation = new Date();
        const productToCreate = newProduct(dateCreation);
        // When
        let productCreated = yield gateway.create(productToCreate).then((data) => {
            return data;
        });
        // Then
        expect(productCreated._id).not.to.be.undefined;
        expect("P-001").to.be.eq(productCreated.code);
        expect("Product 01").to.be.eq(productCreated.name);
        expect(true).to.be.eq(productCreated.active);
        expect(10.50).to.be.eq(productCreated.price);
        expect(2).to.be.eq(productCreated.quantity);
        expect(dateCreation).to.be.eq(productCreated.dateCreation);
        expect(productCreated.dateModification).to.be.undefined;
    }));
    it("Should update a product sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Prepare
        let product = yield gateway.create(newProduct(new Date())).then((data) => {
            return data;
        });
        // Given
        let dateModification = new Date();
        product.name = "Product 02";
        product.dateModification = dateModification;
        // When
        let productUpdated = yield gateway.update(product).then((data) => {
            return data;
        });
        // Then
        expect(productUpdated._id).not.to.be.eq(product._id);
        expect("P-001").to.be.eq(productUpdated.code);
        expect("Product 02").to.be.eq(productUpdated.name);
        expect(true).to.be.eq(productUpdated.active);
        expect(10.50).to.be.eq(productUpdated.price);
        expect(2).to.be.eq(productUpdated.quantity);
        expect(productUpdated.dateCreation).to.not.be.null;
        expect(productUpdated.dateModification).to.not.be.null;
    }));
    it("Should delete a product by code sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Prepare
        let product = yield gateway.create(newProduct(new Date())).then((data) => {
            return data;
        });
        // Given
        let code = product.code;
        // When
        yield gateway.delete(code).then(() => {
            assert.isOk;
        });
        // Then
        yield gateway.findByCode(code)
            .then((data) => {
            assert.fail();
        })
            .catch((err) => {
            assert.isOk;
            expect(err).instanceOf(product_not_found_exception_1.ProductNotFoundException);
        });
    }));
    it("Should get All products sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Prepare
        yield gateway.create(newProduct(new Date(), "1")).then((data) => { });
        yield gateway.create(newProduct(new Date(), "2")).then((data) => { });
        yield gateway.create(newProduct(new Date(), "3")).then((data) => { });
        yield gateway.create(newProduct(new Date(), "4")).then((data) => { });
        // When
        let products = yield gateway.findAll().then((data) => {
            return data;
        });
        // Then
        let codes = [];
        products.forEach(function (e) {
            codes.push(e.code);
        });
        expect(products.length).to.be.eq(4);
        expect(codes).to.have.members(['1', '2', '3', '4']);
    }));
    it("Should get a product by its code sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Prepare
        yield gateway.create(newProduct(new Date(), "1")).then((data) => { });
        // When
        let product = yield gateway.findByCode("1").then((data) => {
            return data;
        });
        // Then
        expect("1").to.be.eq(product.code);
        expect("Product 01").to.be.eq(product.name);
        expect(true).to.be.eq(product.active);
        expect(10.50).to.be.eq(product.price);
        expect(2).to.be.eq(product.quantity);
    }));
    function newProduct(dateCreation, code) {
        return new product_1.default({
            code: lodash_1.defaultTo(code, "P-001"),
            name: "Product 01",
            active: true,
            price: 10.50,
            quantity: 2,
            dateCreation: dateCreation
        });
    }
}));
