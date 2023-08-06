import { IProduct } from "../domains/product";

export class ProductResponse {

  code: string;
  name: string;
  price: number;
  quantity: number;
  description: string;

  constructor(product: IProduct) {
    this.code = product.code;
    this.name = product.name;
    this.price = product.price;
    this.quantity = product.quantity;
    this.description=product.description;
  }
}
