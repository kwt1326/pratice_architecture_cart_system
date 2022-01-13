import { Coupon, Cart, Product } from "../entities";
import { CartItem } from "../entities/interface/cart";
import { LocalStorage } from "../storage/localStorage";

export class CartService {
  _cart: Cart;
  _storage: LocalStorage;

  constructor() {
    this._storage = new LocalStorage('cart');
    this._cart = new Cart(this._storage)
  }

  syncStorage = () => {
    this._storage.data = this._cart.storageData;
  }

  addCartItem = (product: Product) => {
    this._cart.addCartItem(product);
    this.syncStorage();
  }

  removeCartItem = (product: Product) => {
    this._cart.removeCartItem(product);
    this.syncStorage();
  }

  setItemCount = (item: CartItem, count: number) => {
    this._cart.setItemCount(item, count);
    this.syncStorage();
  }

  getCart = () => this._cart.data;

  findOne = (product: Product) => this._cart.findOne(product.itemNo);

  checkMaxSize = () => this._cart.data?.length >= 3;

  /**
   * @brief
   * 최종 결제금액 구하는 서비스 함수
   * 
   * @param products 체크된 상품 목록
   * @param coupon 적용할 쿠폰 (optional)
   * @returns {number} 계산된 최종 금액
   */
  getTotalCost = (items: CartItem[], coupon: Coupon | null): number => {
    // 쿠폰 적용 가능 금액
    const couponCost = items.reduce((prev, curr) => {
      if (curr.product.availableCoupon) {
        return prev + curr.product.price * curr.count
      }
      return prev
    }, 0);

    // 쿠폰 적용 불가 금액
    const noCouponCost = items.reduce((prev, curr) => {
      if (curr.product.availableCoupon === false) {
        return prev + curr.product.price * curr.count;
      }
      return prev
    }, 0)

    let totalCost = 0;

    if (coupon) {
      const { type } = coupon;
      const discount = type === 'rate' ? coupon.discountRate : coupon.discountAmount;
      let calculatedCost = 0;

      if (type === 'rate' && discount) { // RATE
        calculatedCost = (couponCost * (1 - (discount / 100)));
      } else if (discount) { // AMOUNT
        calculatedCost = (couponCost - discount)
      }

      if (calculatedCost > 0) {
        totalCost += calculatedCost;
      }
    } else {
      totalCost += couponCost;
    }

    return Math.floor(totalCost + noCouponCost);
  }
}