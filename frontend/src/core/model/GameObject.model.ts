import type { IConstructor } from '../../interface/ctor'; 
import { Collider } from './component/Collider';
import { Component } from './component/Component';
import { Transform } from './component/Transform';
// import { ObjectManager } from '../manager/object/ObjectManager';

export class GameObject {
  protected components: Map<IConstructor<Component>, Component>;
  protected obj_expired: boolean;

  public get transform(): Readonly<Transform> | null {
    return this.getComponent(Transform) ?? null;
  }

  public get collider(): Readonly<Collider> | null {
    return this.getComponent(Collider);
  }

  constructor() {
    this.components = new Map<IConstructor<Component>, Component>();
    this.obj_expired = false;
  }

  isExpired() {
    return this.obj_expired;
  }

  /**
   * 현재 게임 오브젝트를 만료된 상태로 설정
   */
  markExpired() {
    this.obj_expired = true;
    this.onExpired?.();
  }

  /**
   * 게임 객체가 가진 component를 가져온다.
   * @param ctor 컴포넌트 생성자
   * @returns 
   */
  getComponent<T extends Component>(ctor: IConstructor<T>): Readonly<T> | null {
    return (this.components.get(ctor) ?? null) as Readonly<T> | null;
  }

  /**
   * 게임 객체에 component를 추가한다.
   * @param component 
   * @returns 
   */
  addComponent(component: Component) {
    const ctor = component.constructor as IConstructor<Component>;
    // 생성자가 없으면 돌아간다.
    if (!ctor) return;

    this.components.set(ctor, component);
    component.setGameObject(this);
  }

  /**
   * 게임 객체가 해당 컴포넌트를 보유했는지 여부를 반환한다.
   * @param ctor 
   * @returns 
   */
  hasComponent<T extends Component>(ctor: IConstructor<T>): boolean {
    return this.components.has(ctor);
  }

  /**
   * 게임 객체가 가진 컴포넌트를 제거한다.
   * @param ctor 
   * @returns 
   */
  deleteComponent<T extends Component>(ctor: IConstructor<T>) {
    const component = this.components.get(ctor);
    // 컴포넌트가 없으면 돌아간다.
    if (!component) return;

    component.setGameObject(null);
    this.components.delete(ctor);
  }

  /* 이하 조건부 실행 메서드들 정의 */

  
  /**
   * 게임 오브젝트가 만료되었을 때 실행되는 메서드. 대상 객체에서 구현
   */
  protected onExpired?(): void;

  /**
   * 한 틱마다 실행되는 메서드. 대상 객체에서 구현
   */
  update?(): void;

  /**
   * 충돌 발생 시 실행되는 메서드. 대상 객체에서 구현
   */
  onCollision?(gameObject: GameObject): void;
}
