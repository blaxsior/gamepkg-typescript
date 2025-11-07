import { Vec2D } from "@/interface/vector";
import { Component } from "./Component";

export class Collider extends Component {
  private collider: Vec2D[];

  constructor(collider: Vec2D[]) {
    super();
    this.collider = collider;
  }

  /**
   * collider 좌표 절대값을 반환한다.
   * @returns 
   */
  getCollider(): Vec2D[] {
    return structuredClone(this.collider);
  }

  /**
   * gameobject 기준의 world collider 좌표를 반환한다.
   */
  getWorldCollider(): Vec2D[] | null {
    const go = this.getGameObject();
    if(!go) return null;

    const objPos = go.transform?.getPosition();
    if(!objPos) return null;

    return this.getColliderWorldPos(objPos, this.collider);
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
