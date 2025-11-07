import { Collider } from "@/core/model/component/Collider";
import { Transform } from "@/core/model/component/Transform";
import { GameObject } from "@/core/model/GameObject.model";
import { Vec2D } from "@/interface/vector";
import { Bullet } from "./Bullet.model";

export class Enemy extends GameObject {
  private demage: number;
  private speed: number;
  private hp: number;
  constructor(
    position: Vec2D,
    direction: Vec2D,
    collider: Vec2D[],
    demage: number,
    speed: number,
    hp: number,
  ) {
    super();
    this.addComponent(new Transform(position, direction));
    this.addComponent(new Collider(collider));
    this.demage = demage;
    this.speed = speed;
    this.hp = hp;
  }

  takeDemage(demage: number) {
    this.hp -= demage;
    if (this.isDead()) this.markExpired();
  }

  getDemage() {
    return this.demage;
  }

  isDead() {
    return this.hp <= 0;
  }

  protected move() {
    const transform = this.getComponent(Transform);
    if (!transform) return;

    const dir = transform.getDirection();

    const dist: Vec2D = [dir[0] * this.speed, dir[1] * this.speed];
    transform.translate(dist);
  }

  override update() {
    this.move();
  };

  override onCollision(gameObject: GameObject) {
    if (!(gameObject instanceof Bullet)) return;
    const bullet = gameObject;
    // 총알과 충돌한 경우, 데미지를 입는다.
    // 총알이 비활성화되는 로직은 총알 자체에서 책임진다.
    this.takeDemage(bullet.getDemage());
  };
}
