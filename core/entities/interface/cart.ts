import { Product } from "../product";
import { ProductDtoType } from "./product";

export interface CartItem {
  product: Product;
  count: number;
}

// storage 에서 가져올 때 타입
export interface CartItemDtoType {
  product: ProductDtoType;
  count: number;
}