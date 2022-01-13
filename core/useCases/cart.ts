import { Coupon, Product } from "../entities";
import { CartItem } from "../entities/interface/cart";
import { CartService } from "../service/cart";

export class CartUseCase {
  _service: CartService

  constructor() {
    this._service = new CartService();
  }

  addCartItem = (product: Product) => {
    if (this._service.checkMaxSize()) {
      return alert('더이상 상품을 추가할 수 없습니다. 추가된 상품을 제거해주세요.')  
    }
    this._service.addCartItem(product)
    alert('상품이 장바구니에 추가되었습니다.')
  }

  removeCartItem = (product: Product) => {
    this._service.removeCartItem(product)
    alert('상품이 장바구니에서 제거되었습니다.')
  }

  setItemCount = (item: CartItem, count: number) => {
    this._service.setItemCount(item, count)
  }

  getCart = () => this._service.getCart();

  getTotalCost = (items: CartItem[], coupon: Coupon | null) => this._service.getTotalCost(items, coupon)

  checkExistCartItem = (product: Product) => Boolean(this._service.findOne(product));
}