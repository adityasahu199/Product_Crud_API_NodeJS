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
const mongodb_1 = require("mongodb");
const product_gateway_mongodb_1 = require("../../src/gateways/product.gateway.mongodb");
const product_1 = require("../../src/domains/product");
const ts_mockito_1 = require("ts-mockito");
const product_service_1 = require("../../src/usecases/product.service");
const expect = chai.expect;
const assert = chai.assert;
const objectId = new mongodb_1.ObjectID();
describe("Unit test to cover Product UC.", () => __awaiter(this, void 0, void 0, function* () {
    let gateway;
    let productService;
    beforeEach(() => {
        gateway = ts_mockito_1.mock(product_gateway_mongodb_1.ProductMongoGateway);
        productService = new product_service_1.ProductService(ts_mockito_1.instance(gateway));
    });
    it("Should create a product sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Given
        let product = newProduct();
        // Prepare
        let productMock = newProductInserted(product);
        ts_mockito_1.when(gateway.create(product)).thenResolve(productMock);
        // When
        let productinserted = yield productService.create(product).then((data) => { return data; });
        // Then
        expect(objectId).to.be.eq(productinserted._id);
        expect("P-001").to.be.eq(productinserted.code);
        expect("Product 01").to.be.eq(productinserted.name);
        expect(true).to.be.eq(productinserted.active);
        expect(10.50).to.be.eq(productinserted.price);
        expect(2).to.be.eq(productinserted.quantity);
        expect(productinserted.dateCreation).to.not.be.null;
        expect(productinserted.dateModification).to.be.undefined;
        ts_mockito_1.verify(gateway.create(product)).once();
    }));
    it("Should update a product sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Given
        let product = newProductInserted(newProduct());
        // Prepare
        let productMock = newProductUpdated(product);
        productMock.name = "Product 01 - Updated";
        ts_mockito_1.when(gateway.update(product)).thenResolve(productMock);
        // When
        let productUpdated = yield productService.update(product).then((data) => { return data; });
        // Then
        expect(objectId).to.be.eq(productUpdated._id);
        expect("P-001").to.be.eq(productUpdated.code);
        expect("Product 01 - Updated").to.be.eq(productUpdated.name);
        expect(true).to.be.eq(productUpdated.active);
        expect(10.50).to.be.eq(productUpdated.price);
        expect(2).to.be.eq(productUpdated.quantity);
        expect(productUpdated.dateCreation).to.not.be.null;
        expect(productUpdated.dateModification).to.not.be.null;
        ts_mockito_1.verify(gateway.update(product)).once();
        ts_mockito_1.verify(gateway.findByCode(product.code)).never();
    }));
    it("Should delete a product sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Given
        let product = newProductInserted(newProduct());
        // Prepare
        ts_mockito_1.when(gateway.delete(product.code)).thenResolve();
        // When
        yield productService.delete(product.code).then(() => {
            assert.ok;
        });
        // Then
        ts_mockito_1.verify(gateway.delete(product.code)).once();
        ts_mockito_1.verify(gateway.findByCode(product.code)).never();
    }));
    it("Should get a all active products sucessfully", () => __awaiter(this, void 0, void 0, function* () {
        // Given
        let product1 = newProductInserted(newProduct(), "P-001");
        let product2 = newProductInserted(newProduct(), "P-002");
        let product3 = newProductInserted(newProduct(), "P-003");
        let product4 = newProductInserted(newProduct(), "P-004");
        product4.active = false;
        // Prepare
        ts_mockito_1.when(gateway.findAll()).thenResolve([product1, product2, product3, product4]);
        // When
        let products = yield productService.getAll().then((data) => {
            return data;
        });
        // Then
        let codes = [];
        products.forEach(function (e) {
            codes.push(e.code);
        });
        expect(products).to.have.lengthOf(3);
        expect(codes).to.have.members(['P-001', 'P-002', 'P-003']);
        ts_mockito_1.verify(gateway.findAll()).once();
    }));
    function newProductUpdated(product) {
        let productUpdated = newProductInserted(product);
        productUpdated.dateModification = new Date();
        return productUpdated;
    }
    function newProductInserted(product, code) {
        return new product_1.default({
            _id: objectId,
            code: lodash_1.defaultTo(code, product.code),
            name: product.name,
            active: product.active,
            price: product.price,
            quantity: product.quantity,
            dateCreation: new Date()
        });
    }
    function newProduct(code) {
        return new product_1.default({
            code: lodash_1.defaultTo(code, "P-001"),
            name: "Product 01",
            active: true,
            price: 10.50,
            quantity: 2
        });
    }
}));
