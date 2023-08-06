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
const chai = require("chai");
const index_1 = require("../../src/index");
const product_1 = require("../../src/domains/product");
const ChaiHttp = require("chai-http");
chai.use(ChaiHttp);
const expect = chai.expect;
const assert = chai.assert;
let jwtToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IjEyMzQ1NiJ9.gqTdtCgGoqr1ZIB-l_otn2rmO3wKot5LMBL9mBGLKJQ";
describe('Product Controller Tests', function () {
    // Before each method we need to truncate all products from db
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        product_1.default.deleteMany({}).then();
        const products = require('../mocks/products.json');
        product_1.default.insertMany(products).then();
    }));
    it('should return all active products.', () => __awaiter(this, void 0, void 0, function* () {
        // When
        yield chai.request(index_1.default).get('/api/products').send().then((res) => {
            // Then
            expect(res.status).to.be.eq(200);
            expect(res.body.length).to.be.eq(3);
            expect(res.body[0].code).to.be.eq('P-001');
            expect(res.body[0].name).to.be.eq('Product 01');
            expect(res.body[0].price).to.be.eq(2.22);
            expect(res.body[0].quantity).to.be.eq(2);
            expect(res.body[1].code).to.be.eq('P-002');
            expect(res.body[1].name).to.be.eq('Product 02');
            expect(res.body[1].price).to.be.eq(87.90);
            expect(res.body[1].quantity).to.be.eq(99);
            expect(res.body[2].code).to.be.eq('P-003');
            expect(res.body[2].name).to.be.eq('Product 03');
            expect(res.body[2].price).to.be.eq(213.99);
            expect(res.body[2].quantity).to.be.eq(1);
        }).catch((err) => {
            // Then
            assert.fail();
        });
    }));
    it('should create a product successfully.', () => __awaiter(this, void 0, void 0, function* () {
        // Give
        let request = require('../mocks/product-05.json');
        // When
        yield chai.request(index_1.default)
            .post('/api/products')
            .set('authorization', jwtToken)
            .send(request).then((res) => {
            // Then
            expect(res.status).to.be.eq(201);
            expect(res.body).to.be.empty;
        }).catch((err) => {
            // Then
            assert.fail();
        });
    }));
    it('should validate the creation of a new product that already exists in the database.', () => __awaiter(this, void 0, void 0, function* () {
        // Give
        let request = require('../mocks/product-01.json');
        // When
        yield chai.request(index_1.default)
            .post('/api/products')
            .set('authorization', jwtToken)
            .send(request).then((res) => {
            // Then
            expect(res.status).to.be.eq(422);
            expect(res.body[0].code).to.be.eq('C-001');
            expect(res.body[0].message).to.be.eq('The product has already been registered.');
        }).catch((err) => {
            // Then
            assert.fail();
        });
    }));
    it('should update a product successfully.', () => __awaiter(this, void 0, void 0, function* () {
        // Give
        let request = require('../mocks/product-01.json');
        request.name = "Product 01 - Update";
        // When
        yield chai.request(index_1.default)
            .put('/api/products')
            .set('authorization', jwtToken)
            .send(request).then((res) => {
            // Then
            expect(res.status).to.be.eq(204);
            expect(res.body).to.be.empty;
        }).catch((err) => {
            // Then
            assert.fail();
        });
    }));
    it('should delete a product successfully.', () => __awaiter(this, void 0, void 0, function* () {
        // Give
        let request = require('../mocks/product-01.json');
        // When
        yield chai.request(index_1.default)
            .delete('/api/products/' + request.code)
            .set('authorization', jwtToken)
            .send(request).then((res) => {
            // Then
            expect(res.status).to.be.eq(204);
            expect(res.body).to.be.empty;
        }).catch((err) => {
            // Then
            assert.fail();
        });
    }));
});
