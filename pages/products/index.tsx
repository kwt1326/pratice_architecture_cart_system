/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { NextRouter, withRouter } from 'next/router';
import Image from 'next/image';

import { Product } from '../../core/entities';
import { priceComma } from '../../core/utils/priceUtil';
import { ProductService } from '../../core/service';
import { CartUseCase, ProductUseCase } from '../../core/useCases';
import { getProductsResponseType } from '../../core/entities/interface/product';

import Paging from '../../components/Paging';
import ContentWrap from '../../components/ContentWrap';

import styles from './Products.module.scss';

type ConvertedProductsDataType = { products: Product[], totalPage: number } | undefined

interface ComponentProps {
  router: NextRouter;
  responseData?: getProductsResponseType;
}

const icCartAddSrc = '/ic_cart_add.svg';
const icCartRemoveSrc = '/ic_cart_remove.svg';

const productService = new ProductService();
const productUseCase = new ProductUseCase();
const cartUseCase = new CartUseCase();

const getCurrentPage = (props: ComponentProps) => {
  if (props.router.query?.page) {
    return Number(props.router.query.page)
  }
  return 1;
}

const ProductsPresenter = (props: ComponentProps) => {
  const [list, setList] = useState<Array<Product> | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(getCurrentPage(props));
  const [totalPage, setTotalPage] = useState<number>(0);

  useEffect(() => {
    updateList();
  }, [currentPage])

  const updateList = () => productService.convertDtoCallback(props.responseData, getProductsCallback);

  const getProductsCallback = (convertedData: ConvertedProductsDataType) => {
    if (convertedData?.products) {
      setList(convertedData.products)
      setTotalPage(convertedData.totalPage)
    }
  }

  const movePage = (page: number) => props.router.push(
    { pathname: '/products', query: { page } },
    undefined,
    { shallow: false }
  ).then((_) => {
    setCurrentPage(page);
    updateList();
  })

  const renderCartButton = (params: {
    isAddCart: boolean;
    data: Product;
  }) => {
    const onClick = params.isAddCart
      ? cartUseCase.addCartItem
      : cartUseCase.removeCartItem
    const imgSource = params.isAddCart
      ? icCartAddSrc
      : icCartRemoveSrc

    return (
      <div
        className={styles.btn_cart}
        onClick={() => {
          onClick(params.data)
          updateList();
        }}
      >
        <Image
          src={imgSource}
          alt='icon_cart'
          width={40}
          height={40}
        />
      </div>
    )
  }

  const renderProductList = () => (
    <ul className={styles.ul_products_wrap}>
      {
        (Array.isArray(list) && list.length > 0) ? (
          list.map((item: Product, i) => (
            <li key={i} className={styles.li_product_item}>
              <img src={item.detailImageUrl} alt='img_product_thumbnail' />
              <div>
                <p>{item.itemName}</p>
                <p>{`${priceComma(String(item.price))}원`}</p>
                {
                  renderCartButton({
                    data: item,
                    isAddCart: !cartUseCase.checkExistCartItem(item),
                  })
                }
              </div>
            </li>
          ))
        ) : (
          <p>상품이 존재하지 않습니다.</p>
        )
      }
    </ul>
  )

  return (
    <ContentWrap>
      <section className={styles.container}>
        {renderProductList()}
        <Paging
          perGroupPage={5}
          currentPage={currentPage}
          totalPage={totalPage}
          movePageFunc={movePage}
        />
      </section>
    </ContentWrap>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const responseData = await productUseCase.getProducts(context.query.page ? Number(context.query.page) : 1)
  return {
    props: {
      responseData
    }
  }
}

export default withRouter(ProductsPresenter)