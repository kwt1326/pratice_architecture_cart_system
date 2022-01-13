import { LocalStorage } from "../storage/localStorage"
import { CartItem, CartItemDtoType } from "./interface/cart";
import { Product } from "./product";

export class Cart {
  _data: Array<CartItem>

  constructor(storage: LocalStorage) {
    this._data = this.getInitData(storage);
  }
  
  get data() {
    return this._data;
  }

  // storage 저장용 getter
  get storageData() {
    return this._data.map((item: CartItem) => ({
      product: item.product._data,
      count: item.count
    }));
  }

  // storage 에 저장된 항목을 객체로 변환
  getInitData = (storage: LocalStorage) => {
    return Array.isArray(storage.data)
      ? storage.data.map((data: CartItemDtoType) => ({
        product: new Product(data.product),
        count: data.count
      }))
      : []
  }

  // 이미 상품이 존재하면, count 를 올린다.
  addCartItem = (product: Product) => {
    const findIt = this._data.find((item: CartItem) => item.product.itemNo === product.itemNo);

    if (findIt) {
      this._data = this._data.map((item: CartItem) => {
        if (item.product.itemNo === product.itemNo) {
          item.count++;
        }
        return item;
      })
      return;
    }

    this._data.push({ product, count: 1 })
  }

  removeCartItem = (product: Product) => {
    this._data = this._data.filter((_item: CartItem) => _item.product.itemNo !== product.itemNo)
  }

  // count 변동 적용
  setItemCount = (item: CartItem, count: number) => {
    this._data = this._data.map((_item: CartItem) => {
      if (_item.product.itemNo === item.product.itemNo) {
        return {
          product: _item.product,
          count
        }
      }
      return _item;
    })
  }

  findOne = (itemNo: number) => {
    return this._data.find((item: CartItem) => itemNo === item.product.itemNo)
  }
}