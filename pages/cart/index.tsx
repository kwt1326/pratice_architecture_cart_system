/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { GetServerSidePropsContext } from 'next';
import { NextRouter, withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ContentWrap from '../../components/ContentWrap';

import { Coupon } from '../../core/entities';
import { CartItem } from '../../core/entities/interface/cart';
import { getCouponsResponseType } from '../../core/entities/interface/coupon';
import { CouponService } from '../../core/service';
import { CartUseCase, CouponUseCase } from '../../core/useCases';
import { priceComma } from '../../core/utils/priceUtil';

import styles from './Cart.module.scss';

type ConvertedCouponsDataType = { coupons: Coupon[] } | undefined

interface ComponentProps {
  router: NextRouter;
  responseData?: getCouponsResponseType;
}

let cartUseCase: CartUseCase | null = null;
const couponUseCase = new CouponUseCase();
const couponService = new CouponService();

const CartPresenter = (props: ComponentProps) => {
  const [couponList, setCouponList] = useState<Array<Coupon> | null>(null);
  const [cartItemList, setCartItemList] = useState<Array<CartItem> | null>(null);
  const [checkedCartKeys, setCheckedCartKeys] = useState<Array<number>>([]);
  const [checkedCouponKey, setCheckedCoupon] = useState<number>(-1);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    cartUseCase = new CartUseCase();
    setCartItemList(cartUseCase.getCart());
    couponService.convertDtoCallback(props.responseData, getCouponsCallback)
  }, [])

  useEffect(() => {
    updateTotalCost();
  }, [
    checkedCouponKey,
    checkedCartKeys,
    cartItemList
  ])

  const getCouponsCallback = (responseData: ConvertedCouponsDataType) => {
    if (responseData?.coupons) {
      setCouponList(responseData.coupons)
    }
  }

  const updateTotalCost = () => {
    const checkedItems = cartItemList?.filter((_: CartItem, i: number) => checkedCartKeys.includes(i))
    const checkedCoupon = couponList && couponList[checkedCouponKey];

    if (checkedItems) {
      const totalCost = cartUseCase?.getTotalCost(checkedItems, checkedCoupon)
      if (totalCost !== undefined) {
        setTotalCost(totalCost); 
      }
    }
  }

  const onChangeCheckCartItem = (key: number) => {
    if (checkedCartKeys.find(_key => _key === key) !== undefined) {
      return setCheckedCartKeys(checkedCartKeys.filter(_key => Number(_key) !== key));
    }
    setCheckedCartKeys([...checkedCartKeys, key]);
  }

  const onChangeCheckCouponItem = (key: number) => {
    if (checkedCouponKey === key) {
      return setCheckedCoupon(-1);
    }
    setCheckedCoupon(key);
  }

  const renderCartItems = () => (
    <ul className={styles.ul_cart_items_wrap}>
      {
        (Array.isArray(cartItemList) && cartItemList.length > 0) ? (
          cartItemList.map((item: CartItem, i) => {
            const product = item.product;

            return (
              <li key={i} className={styles.li_cart_item}>
                <div>
                  {renderCheckButton(i, 'CART')}
                  <img src={product.detailImageUrl} alt='img_product_thumbnail' />
                </div>
                <div>
                  <p>{product.itemName}</p>
                  <p>{`${priceComma(String(product.price))}원`}</p>
                  {renderCountUpDownButton(item)}
                  {
                    product.availableCoupon === false && (
                      <p>(쿠폰 사용불가 상품)</p>
                    )
                  }
                </div>
              </li>
            )
          })
        ) : (
          <p>장바구니 목록이 비어있습니다.</p>
        )
      }
    </ul>
  )

  const renderCheckButton = (key: number, type: 'CART' | 'COUPON') => {
    const isChecked = type === 'CART'
      ? checkedCartKeys.find(_key => _key === key) !== undefined
      : checkedCouponKey === key
    const onChange = type === 'CART' ? onChangeCheckCartItem : onChangeCheckCouponItem

    return (
      <input
        type="checkbox"
        onChange={() => onChange(key)}
        checked={isChecked}
      />
    )
  }

  const renderCountUpDownButton = (item: CartItem) => {
    return (
      <div className={styles.input_count_up_down_wrap}>
        <label htmlFor="cart_item_count">{'수량 :'}</label>
        <input
          type="number"
          name="cart_item_count"
          min={1}
          value={item.count}
          onChange={(e) => {
            const count = e.target.value;
            cartUseCase?.setItemCount(item, Number(count))
            cartUseCase && setCartItemList(cartUseCase.getCart());
          }}
        />
      </div>
    )
  }

  const renderCouponList = () => {
    return (
      <div className={styles.coupon_list_wrap}>
        <h1>쿠폰</h1>
        {
          (Array.isArray(couponList) && couponList.length > 0)
            ? (
              <ul className={styles.ul_coupon_items_wrap}>
                {
                  couponList.map((coupon: Coupon, i) => (
                    <li key={i} className={styles.li_coupon_item}>
                      {renderCheckButton(i, 'COUPON')}
                      <p>
                        <span>{coupon.title}</span>
                        {
                          checkedCouponKey === i && (
                            <span>&nbsp;(쿠폰 적용중)</span>
                          )
                        }
                      </p>
                    </li>
                  ))
                }
              </ul>
            )
            : <p>보유한 쿠폰이 없습니다.</p>
        }
      </div>
    )
  }

  const renderTotalCost = () => {
    return (
      <div className={styles.total_cost_wrap}>
        <p>총 결제금액: {priceComma(String(totalCost))} 원</p>
      </div>
    )
  }

  return (
    <ContentWrap>
      <section className={styles.container}>
        {renderCartItems()}
        {renderCouponList()}
        {renderTotalCost()}
      </section>
    </ContentWrap>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const responseData = await couponUseCase.getCoupons()
  return {
    props: {
      responseData
    }
  }
}

export default withRouter(CartPresenter)