import { AABBDetectionStrategy } from './manager/collision/strategy/AABB.strategy';
import { CollisionManager } from './manager/collision/CollisionManager';

import { GameObject } from './model/GameObject.model'; 

import { InputManager } from './manager/io/InputManager';
import { ObjectManager } from './manager/object/ObjectManager';

export class GameEngine {
  // 화면의 가로 / 세로는 고정된 값으로 가정
  private screen_width: number = 1000;
  private screen_height: number = 800;

  private collisionManager: CollisionManager;
  private inputManager: InputManager;
  private objectManager: ObjectManager;

  constructor() {
    const collisionStrategy = new AABBDetectionStrategy();
    this.collisionManager = new CollisionManager(collisionStrategy);

    this.inputManager = InputManager.instance;
    this.objectManager = ObjectManager.instance;
  }

  getScreenSize() {
    return {
      width: this.screen_width,
      height: this.screen_height,
    };
  }

  initGame() {
  }

  update() {
    const objects = this.objectManager.getObjects();

    // update을 구현한 객체들의 동작을 처리한다.
    for(const object of objects) {
      object.update?.();
    }
    // collision 처리
    this.collisionManager.detectAndHandleCollision(objects);

    // 화면을 벗어난 객체들을 처리
    this.expireOutObjs(objects);

    // expire 처리 된 객체들 제거
    this.objectManager.deleteExpiredObjs();

    // 사용자 입력 초기화
    this.inputManager.clearInput();
  }

  /**
   * 사용자의 입력에 대응한다. UserAction에 맞지 않는 문자열의 요청이 올 경우 무시한다.
   * @param action 사용자가 요청한 액션을 의미하는 문자열
   */
  onInput(action: string) {
    this.inputManager.setUserInput(action);
  }

  /**
   * 화면 바깥으로 나간 객체들을 expired로 마킹한다.
   */
  private expireOutObjs(gameObjects: readonly GameObject[]) {
      for (const gameObject of gameObjects) {
        if (gameObject.isExpired() || !gameObject.transform) continue;
  
        const [x, y] = gameObject.transform.getPosition();
  
  
        if (x < 0 || x > this.screen_width || y < 0 || y > this.screen_height) {
          gameObject.markExpired();
        }
      }
    }
}
