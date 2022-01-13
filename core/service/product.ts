import { Product } from "../entities";
import { getProductsResponseType, ProductDtoType } from "../entities/interface/product";
import { fetchGet } from "../utils/callApi";

export class ProductService {
  // 'dto list' convert to 'product list'
  convertDtoCallback = (responseData: getProductsResponseType, callback?: Function) => {
    if (responseData && Array.isArray(responseData?.products)) {
      callback && callback({
        products: responseData.products.map((product: ProductDtoType) => new Product(product)),
        totalPage: responseData.totalPage
      })
    }
  }

  getProducts = (page: number = 1, callback?: Function) => {
    return fetchGet(
      `${process.env.apiHost}/products?page=${page}`,
      callback && this.convertDtoCallback,
    )
  }
}