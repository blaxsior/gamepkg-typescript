import { GameObject } from "../GameObject.model";

/**
 * 게임 오브젝트가 가지는 컴포넌트를 의미하는 클래스
 */
export abstract class Component {
  private _gameObject: GameObject | null;

  constructor() {
    this._gameObject = null;
  }

  getGameObject(): GameObject | null {
    return this._gameObject;
  }

  setGameObject(gameObject: GameObject | null) {
    this._gameObject = gameObject;
  }

  public get gameObject(): GameObject | null {
    return this._gameObject;
  }
}
