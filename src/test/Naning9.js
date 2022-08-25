import {stringTointeger} from './convert.js';

const defaultNaning9ModelValues = () => {
  return {
    id: '',
    name: '',
    thumbnail: '',
    price: 0,
    discountPrice: 0
  };
};

// TODO - setter validate
export class Naning9Model {
  #id = '';
  #name = '';
  #thumbnail = '';
  #price = 0;
  #discountPrice = 0;

  setParamsValues(params = {}) {
    const {id, name, thumbnail, price, discountPrice} = Object.assign({}, defaultNaning9ModelValues(), {...params});

    this.setId(id);
    this.setName(name);
    this.setThumbnail(thumbnail);
    this.setPrice(price);
    this.setDiscountPrice(discountPrice);

    return this;
  }

  setId(value) {
    this.#id = value;
  }

  get id() {
    return this.#id;
  }

  setName(value) {
    this.#name = value.trim();
  }

  get name() {
    return this.#name;
  }

  setThumbnail(value) {
    this.#thumbnail = value;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  setPrice(value) {
    this.#price = stringTointeger(value);
  }

  get price() {
    return this.#price;
  }

  setDiscountPrice(value) {
    this.#discountPrice = stringTointeger(value);
  }

  get discountPrice() {
    return this.#discountPrice;
  }

  toData() {
    return {
      id: this.id,
      name: this.name,
      thumnail: this.thumbnail,
      price: this.price,
      discountPrice: this.discountPrice
    };
  }

  toJSON() {
    return JSON.stringify(this.toData());
  }
}