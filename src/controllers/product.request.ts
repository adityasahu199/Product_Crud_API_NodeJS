export class ProductRequest {

    constructor (
        public code: string,
        public name: string,
        public price: number,
        public quantity: number,
        public description: string,
    ){}

}