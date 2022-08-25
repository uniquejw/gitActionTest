
const defaultNaning9ModelValues = () => {
  return {
    name: '',
    cUrl: '',
  };
};

// TODO - setter validate
export class cateModel {
  #name = '';
  #cUrl = '';
  

  setParamsValues(params = {}) {
    const {name,cUrl} = Object.assign({}, defaultNaning9ModelValues(), {...params});

    this.setName(name);
    this.setCUrl(cUrl);

    return this;
  }

  setName(value) {
    this.#name = value.trim();
  }

  get name() {
    return this.#name;
  }

  setCUrl(value) {
    this.#cUrl = value;
  }

  get cUrl() {
    return this.#cUrl;
  }

  toData() {
    return {
      name: this.name,
      cUrl: this.cUrl
    };
  }

  toJSON() {
    return JSON.stringify(this.toData());
  }
}