import { GameObject } from '../core/GameObject.model';
import { InputManager } from '../../manager/io/InputManager';

import { BulletSpawner } from './BulletSpawner.model';
import { Transform } from '../core/component/Transform';
import { angleToVector } from '../../../util/angle';

import type { NumRange } from '../../../interface/range';
import type { Vec2D } from '../../../interface/vector';

import { UserAction } from '../../../interface/user-action';

export class Gun extends GameObject {
  /**
   * 각도의 최소 & 최대값
   */
  private range_angle: NumRange;

  /**
   * 현재 각도
   */
  private angle: number;
  private angle_speed: number;

  private bulletSpawner: BulletSpawner;

  constructor(
    pos: Vec2D,
    dir: Vec2D,
    range_angle: NumRange,
    bulletSpawner: BulletSpawner,
  ) {
    super();
    this.addComponent(new Transform(pos, dir));
    this.range_angle = range_angle;
    this.angle = 0;
    this.angle_speed = 5;
    this.bulletSpawner = bulletSpawner;
  }

  update(): void {
    const Input = InputManager.instance;
    if(Input.checkInput(UserAction.FIRE)) {
      this.fire();
    }
    if(Input.checkInput(UserAction.ROT_LEFT)) {
      this.rotate(-this.angle_speed);
    }
    if(Input.checkInput(UserAction.ROT_RIGHT)) {
      this.rotate(this.angle_speed);
    }
  }


  fire(): void {
    const transform = this.getComponent(Transform);
    if (!transform) return;

    this.bulletSpawner.setBulletInitialPosition(transform.getPosition());
    this.bulletSpawner.setBulletInitialDirection(transform.getDirection());

    this.bulletSpawner.spawn();
  }

  rotate(angle: number): void {
    this.angle += angle;
    // 최소 최대 보정
    if (this.angle > this.range_angle.to) this.angle = this.range_angle.to;
    if (this.angle < this.range_angle.from) this.angle = this.range_angle.from;

    const transform = this.getComponent(Transform);
    if (!transform) return;

    transform.setDirecion(angleToVector(angle));
  }

  getAngle() {
    return this.angle;
  }
}
