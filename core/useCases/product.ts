import { ProductService } from "../service/product";

export class ProductUseCase {
  _service: ProductService;

  constructor() {
    this._service = new ProductService();
  }

  getProducts = (page: number, callback?: Function) => {
    return this._service.getProducts(page, callback);
  }
}