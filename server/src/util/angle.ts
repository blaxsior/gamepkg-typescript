import type { Vec2D } from '../interface/vector';

/**
 * 각도를 라디안으로 변경한다.
 */
export function angleToRad(angle: number) {
  return (Math.PI * angle) / 180.0;
}

/**
 * 라디안 각도를 벡터로 변환한다.
 */
export function radToVector(rad: number): Vec2D {
  return [Math.cos(rad), Math.sin(rad)];
}

/**
 * 각도를 벡터로 변경한다.
 */
export function angleToVector(angle: number): Vec2D {
  const rad = angleToRad(angle);
  return radToVector(rad);
}

/**
 * 벡터를 라디안으로 변경한다.
 */
export function vectorToRad(vec: Vec2D) {
  const [x, y] = vec;
  return Math.atan2(y, x);
}

export function radToAngle(rad: number) {
  const angle = (rad * 180.0) / Math.PI;
  return angle;
}

/**
 * 벡터를 각도로 변경한다.
 */
export function vectorToAngle(vec: Vec2D) {
  const rad = vectorToRad(vec);
  return radToAngle(rad);
}
