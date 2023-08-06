"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    code: { type: mongoose_1.Schema.Types.String, required: true, index: true, unique: true },
    name: { type: mongoose_1.Schema.Types.String, required: true },
    price: { type: mongoose_1.Schema.Types.Number, required: true },
    active: { type: mongoose_1.Schema.Types.Boolean, required: true },
    quantity: { type: mongoose_1.Schema.Types.Number, required: true },
    dateCreation: { type: mongoose_1.Schema.Types.Date, required: true },
    dateModification: { type: mongoose_1.Schema.Types.Date }
});
const productModel = mongoose.model("Product", ProductSchema);
productModel.createIndexes();
exports.default = productModel;
