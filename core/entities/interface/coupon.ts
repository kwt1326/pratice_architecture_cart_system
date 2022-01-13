export interface CouponDtoType {
  type: DiscountType;
  title: string;
  discountRate?: number;
  discountAmount?: number;
}

export type DiscountType = 'rate' | 'amount'

export type getCouponsResponseType = { coupons: CouponDtoType[] } | undefined