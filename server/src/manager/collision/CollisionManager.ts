import { GameObject } from 'src/model/GameObject.Model';
import type { ICollisionDetectionStrategy } from './strategy/collision.strategy';

export class CollisionManager {
  constructor(private strategy: ICollisionDetectionStrategy) {}

  detectAndHandleCollision(objects: GameObject[]) {
    for (let i = 0; i < objects.length - 1; i++) {
      const obj1 = objects[i];
      // 객체가 비활성화 or 제거되는 경우는 스킵
      if (obj1.isExpired()) continue;

      for (let j = i + 1; j < objects.length; j++) {
        const obj2 = objects[j];
        // 객체가 비활성화 or 제거되는 경우는 스킵
        if (obj2.isExpired()) continue;

        // 충돌이 발생한 경우, 양측에 충돌을 알린다.
        if (this.strategy.checkCollision(obj1, obj2)) {
          obj1.onCollision(obj2);
          obj2.onCollision(obj1);
        }
      }
    }
  }
}
