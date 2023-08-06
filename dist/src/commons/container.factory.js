"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const product_controller_1 = require("../controllers/product.controller");
const security_filter_middleware_1 = require("../commons/security.filter.middleware");
const product_gateway_mongodb_1 = require("../gateways/product.gateway.mongodb");
const product_service_1 = require("../usecases/product.service");
class ContainerFactory {
    constructor() { }
    static create() {
        let container = new inversify_1.Container();
        // note that you *must* bind your controllers to Controller
        container
            .bind(inversify_express_utils_1.TYPE.Controller)
            .to(product_controller_1.ProductController)
            .inSingletonScope()
            .whenTargetNamed(product_controller_1.ProductController.TARGET_NAME);
        container
            .bind(product_gateway_mongodb_1.ProductMongoGateway.TARGET_NAME)
            .to(product_gateway_mongodb_1.ProductMongoGateway)
            .inSingletonScope();
        container
            .bind(product_service_1.ProductService.TARGET_NAME)
            .to(product_service_1.ProductService)
            .inSingletonScope();
        container
            .bind('SecurityFilterMiddleware')
            .toConstantValue(security_filter_middleware_1.SecurityFilterMiddlewareFactory.create());
        return container;
    }
}
exports.ContainerFactory = ContainerFactory;
