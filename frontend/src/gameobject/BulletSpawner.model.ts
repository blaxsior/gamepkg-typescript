import { GameObject } from "@/core/model/GameObject.model";
import { ISpawner } from "@/interface/spawner";
import { Vec2D } from "@/interface/vector";

export abstract class BulletSpawner extends GameObject implements ISpawner {
  protected bullet_position: Vec2D | null;
  protected bullet_direction: Vec2D | null;

  // 생성할 bullet 관련 정보
  protected bullet_collider: Vec2D[];
  protected bullet_demage: number;
  protected bullet_speed: number;

  constructor(bulletInfo: BulletInfo) {
    super();
    this.bullet_position = null;
    this.bullet_direction = null;
    this.bullet_collider = bulletInfo.collider;
    this.bullet_demage = bulletInfo.demage;
    this.bullet_speed = bulletInfo.speed;
  }

  abstract canSpawn(): boolean;
  abstract spawn(): void;
  setBulletInitialPosition(pos: Vec2D) {
    this.bullet_position = pos;
  }

  setBulletInitialDirection(dir: Vec2D) {
    this.bullet_direction = dir;
  }
}

/**
 * 총알에 대한 기본 정보
 */
export type BulletInfo = {
  collider: Vec2D[];
  demage: number;
  speed: number;
};
