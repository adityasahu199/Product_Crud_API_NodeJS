"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessException extends Error {
    constructor(code, message) {
        super();
        this.httpStatus = 422;
        this.code = code;
        this.message = message;
    }
}
exports.BusinessException = BusinessException;
