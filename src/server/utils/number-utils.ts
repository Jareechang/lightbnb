import _toNumber from 'lodash.tonumber';

/*
 * Converts given value into a number
 *
 * Extension of lodash toNumber
 * - Adds `defaultValue` for function to default to incase of bad data
 * - Handle NaN data types returned
 *
 * **/
export const toNumber = (
  num: string,
  defaultValue: number
) : number => {
  const value : unknown = _toNumber(num);
  if (!value || isNaN(value)) {
    return defaultValue;
  }
  return value;
}
