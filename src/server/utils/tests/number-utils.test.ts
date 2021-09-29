import { toNumber } from '@app/server/utils';

describe('@app/server/utils/number-utils', () => {
  describe('toNumber()', () => {
    it('should parse string to number', () => {
      expect(toNumber('4')).toEqual(4);
    });
    it('should default to value if converted type is NaN', () => {
      expect(toNumber('abc', 5)).toEqual(5);
      expect(toNumber('23ads', 5)).toEqual(5);
    });
  });
});
