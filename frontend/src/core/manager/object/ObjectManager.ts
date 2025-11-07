import { IConstructor } from "../../../interface/ctor";
import { GameObject } from "../../model/GameObject.model";

/**
 * object 생명주기를 담당하는 매니저
 */
export class ObjectManager {
  private gameObjects: GameObject[];

  private static manager: ObjectManager | null = null;

  static get instance(): ObjectManager {
    if (!this.manager) {
      this.manager = new ObjectManager();
    }
    return this.manager;
  }

  private constructor() {
    this.gameObjects = [];
  }

  /**
   * 객체를 생성하는 클래스. 이 메서드로 생성하면 생명주기에 포함된다.
   */
  createObject<T extends GameObject, P extends any[]>(
    ctor: IConstructor<T, P>,
    ...args: ConstructorParameters<typeof ctor>
  ): T {
    const gameObject = new ctor(...args);
    this.manageObject(gameObject);
    return gameObject;
  }

  /**
   * 객체를 관리 풀에 넣는 클래스
   */
  manageObject<T extends GameObject>(gameObject: T) {
    this.gameObjects.push(gameObject);
    return gameObject;
  }

  /**
   * expired로 마킹된 객체들을 리스트에서 제거한다.
   */
  deleteExpiredObjs() {
    this.gameObjects = this.gameObjects.filter((it) => !it.isExpired());
  }

  /**
   * 모든 게임 오브젝트를 찾는다.
   */
  getObjects(): readonly GameObject[] {
    return this.gameObjects;
  }

  /**
   * 클래스 타입 기반으로 게임 오브젝트를 찾는다.
   */
  findObjectsByType(ctor: IConstructor<GameObject>): readonly GameObject[] {
    return this.gameObjects.filter((it) => it instanceof ctor);
  }
}
