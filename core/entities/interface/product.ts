export interface ProductDtoType {
  item_no: number;
  item_name: string,
  detail_image_url: string,
  price: number,
  score: number,
  availableCoupon?: boolean,
}

export type getProductsResponseType = { products: ProductDtoType[], totalPage: number } | undefined;