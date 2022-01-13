import { isClient } from "../utils/server";

export class LocalStorage {
  _data: string | null;
  _type: string;

  constructor(type: string) {
    this.initStorage(type);
    this._data = isClient() ? localStorage.getItem(type) : null;
    this._type = type;
  }

  get data() {
    return this._data ? JSON.parse(this._data) : null;
  }

  set data(data: any) {
    this._data = JSON.stringify(data);
    this._data && localStorage.setItem(this._type, this._data);
  }

  initStorage = (type: string) => {
    if (isClient() && localStorage.getItem(type) === null) {
      localStorage.setItem(type, JSON.stringify([]));
    }
  }
}