import { CouponDtoType, DiscountType } from "./interface/coupon";

export class Coupon {
  _data: CouponDtoType

  constructor(data: CouponDtoType) {
    this._data = data;
  }

  get type(): DiscountType {
    return this._data.type;
  }
  
  get title(): string {
    return this._data.title;
  }
  
  get discountRate(): number | null {
    return this._data.discountRate || null;
  }
  
  get discountAmount(): number | null {
    return this._data.discountAmount || null;
  }
}