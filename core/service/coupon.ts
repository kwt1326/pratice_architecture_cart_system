import { Coupon } from "../entities"
import { CouponDtoType, getCouponsResponseType } from "../entities/interface/coupon"
import { fetchGet } from "../utils/callApi"

export class CouponService {  
  // 'dto list' convert to 'coupon list'
  convertDtoCallback = (responseData: getCouponsResponseType, callback?: Function) => {
    if (responseData && Array.isArray(responseData?.coupons)) {
      callback && callback({
        coupons: responseData.coupons.map((coupon: CouponDtoType) => new Coupon(coupon)),
      })
    }
  }
  getCoupons = (callback?: Function) => {
    return fetchGet(
      `${process.env.apiHost}/coupons`,
      callback && this.convertDtoCallback,
    )
  }
}