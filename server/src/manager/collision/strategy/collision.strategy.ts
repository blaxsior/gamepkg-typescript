import { GameObject } from 'src/model/GameObject.Model';

export interface ICollisionDetectionStrategy {
  checkCollision(collider1: GameObject, collider2: GameObject): boolean;
}
