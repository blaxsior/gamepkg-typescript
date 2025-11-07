import { GameObject } from '../core/GameObject.model';

export class Player extends GameObject {
  private hp: number;
  private score: number;

  constructor(hp: number) {
    super();
    this.hp = hp;
    this.score = 0;
  }

  takeDamage(demage: number) {
    this.hp -= demage;
  }

  addScore(score: number) {
    this.score += score;
  }

  getHp() {
    return this.hp;
  }

  getScore() {
    return this.score;
  }

  isDead() {
    return this.hp <= 0;
  }
}
