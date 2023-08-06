"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const business_exception_1 = require("../domains/business.exception");
class ErrorHandlerFactory {
    constructor() { }
    static create() {
        return (app) => {
            app.use((err, request, response, next) => {
                if (err instanceof business_exception_1.BusinessException || err.httpStatus >= 400) {
                    let be = err;
                    response.status(be.httpStatus).json([{
                            code: be.code,
                            message: be.message,
                        }]).end();
                }
                else {
                    response.status(500).json([{
                            code: 'INTERNAL_SERVER_ERROR',
                            message: 'Internal Server Error.',
                        }]).end();
                }
            });
        };
    }
}
exports.ErrorHandlerFactory = ErrorHandlerFactory;
class JsonException {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}
exports.JsonException = JsonException;
