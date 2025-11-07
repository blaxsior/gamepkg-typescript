import { CollisibleGameObject } from '../../model/CollisibleGameObject.model';

import type { ICollisionDetectionStrategy } from './collision.strategy';
import { Vec2D } from '../../interface/vector';

export class OBBDetectionStrategy implements ICollisionDetectionStrategy {
  checkCollision(obj1: CollisibleGameObject, obj2: CollisibleGameObject) {
    const collider1 = obj1.getCollider();
    const collider2 = obj2.getCollider();

    // 3차원 도형에 대해서는 검사하지 않는다.
    if (collider1.length < 3 || collider2.length < 3) return false;

    const position1 = obj1.getPosition();
    const position2 = obj2.getPosition();

    const world_collider1 = this.getColliderWorldPos(position1, collider1);
    const world_collider2 = this.getColliderWorldPos(position2, collider2);
    // TODO: 알고리즘 마저 구현

    return true;
  }

  /**
   * 좌표, 콜라이더 정보를 받아 콜라이더의 월드 좌표계를 반환한다.
   */
  private getColliderWorldPos(position: Vec2D, collider: Vec2D[]) {
    const collider_world_pos = structuredClone(collider);
    for (const pos of collider_world_pos) {
      pos[0] += position[0]; // x 좌표 덧셈
      pos[1] += position[1]; // y 좌표 덧셈
    }

    return collider_world_pos;
  }
}
