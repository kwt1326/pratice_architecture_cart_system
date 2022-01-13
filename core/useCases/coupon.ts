import { CouponService } from "../service/coupon";

export class CouponUseCase {
  _service: CouponService;

  constructor() {
    this._service = new CouponService();
  }

  getCoupons = (callback?: Function) => {
    return this._service.getCoupons(callback);
  }
}