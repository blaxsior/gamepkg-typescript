import { NumRange } from '../interface/range';

/**
 * from, to 사이의 랜덤한 숫자를 선택한다.
 */
export function pickRandomNumberInRange(range: NumRange): number {
  const interval = range.to - range.from;
  return range.from + interval * Math.random();
}
