import { ProductDtoType } from "./interface/product";

export class Product {
  _data: ProductDtoType;

  constructor(data: ProductDtoType) {
    this._data = data;
  }

  get itemNo(): number {
    return this._data.item_no;
  }

  get itemName(): string {
    return this._data.item_name;
  }
  
  get detailImageUrl(): string {
    return this._data.detail_image_url
  }
  
  get price(): number {
    return this._data.price
  }
  
  get score(): number {
    return this._data.score
  }
  
  get availableCoupon(): boolean {
    return typeof this._data?.availableCoupon !== 'undefined' ? this._data.availableCoupon : true;
  }
}