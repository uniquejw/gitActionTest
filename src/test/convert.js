export const stringTointeger = value => {
    return parseInt(`${value}`.match(/(\d+)/g)?.join('') || '0', 10);
  };