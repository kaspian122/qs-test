const isNull = value => value === undefined || value === null;

export const isEmpty = value =>
  isNull(value) ||
  value === false ||
  (Object.keys(value).length === 0 && value.constructor === Object) ||
  value.length === 0;
