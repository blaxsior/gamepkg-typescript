import { GameObject } from "@/core/model/GameObject.model";
import { ICollisionDetectionStrategy } from "./collision.strategy";
import { Vec2D } from "@/interface/vector";


export class OBBDetectionStrategy implements ICollisionDetectionStrategy {
  checkCollision(obj1: GameObject, obj2: GameObject) {
    const collider1 = obj1.collider;
    const collider2 = obj2.collider;

    if(!collider1 || !collider2) return false;

    // 3차원 도형에 대해서는 검사하지 않는다.
    const position1 = obj1.transform?.getPosition();
    const position2 = obj2.transform?.getPosition();

    if(!position1 || !position2) return false;

    const world_collider1 = this.getColliderWorldPos(position1, collider1.getCollider());
    const world_collider2 = this.getColliderWorldPos(position2, collider1.getCollider());
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
