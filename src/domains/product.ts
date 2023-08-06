import  {Document, Schema} from "mongoose";
import * as mongoose from "mongoose";

export interface IProduct extends Document {
    code: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    dateCreation: Date;
    dateModification: Date;
}
const ProductSchema: Schema = new Schema({
    code: {type: Schema.Types.String, required: true, index: true, unique: true },
    name: {type: Schema.Types.String, required: true},
    price: {type: Schema.Types.Number, required: true},
    description: {type: Schema.Types.String, required: true},
    quantity: {type: Schema.Types.Number, required: true},
    dateCreation: {type: Schema.Types.Date, required: true},
    dateModification: {type: Schema.Types.Date}
});

const productModel = mongoose.model<IProduct>("Product", ProductSchema);
productModel.createIndexes();

export default productModel;