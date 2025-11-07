import { GameObject } from "@/core/model/GameObject.model";
import { BulletInfo, BulletSpawner } from "./BulletSpawner.model";
import { ObjectManager } from "@/core/manager/object/ObjectManager";
import { Bullet } from "./Bullet.model";

export class LimitCountBulletSpawner extends BulletSpawner {
  private max_count: number;
  
  /**
   * 만료된 총알 오브젝트를 알아내기 위한 배열. 총알 자체 기능이 필요한게 아니므로 GameObject로 받음.
   */
  private bullets: GameObject[];

  constructor(max_count: number, bulletInfo: BulletInfo) {
    super(bulletInfo);
    this.bullets = [];
    this.max_count = max_count;
  }
  override spawn(): void {
    this.removeExpiredBullets();
    if (!this.canSpawn()) return;
    if (!this.bullet_direction || !this.bullet_position) {
      throw new Error('bullet_position and direction must be set');
    }

    const bullet = ObjectManager.instance.createObject(
      Bullet,
      this.bullet_position,
      this.bullet_direction,
      this.bullet_collider,
      this.bullet_demage,
      this.bullet_speed
    );
    this.bullets.push(bullet);

    this.bullet_position = null;
    this.bullet_direction = null;
  }
  /**
   * 총알의 상태를 검사, 만료된 경우 제거한다.
   */
  private removeExpiredBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      if (!this.bullets[i].isExpired()) continue;

      this.bullets.splice(i, 1);
      i--;
    }
  }

  canSpawn(): boolean {
    return this.bullets.length < this.max_count;
  }

  override update(): void {
    this.spawn();
  }
}
