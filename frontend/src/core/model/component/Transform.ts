import { Vec2D } from '@/interface/vector';
import { Component } from './Component';
import { angleToRad, radToVector, vectorToRad } from '@/util/math/angle';


export class Transform extends Component {
  private position: Vec2D;
  private direction: Vec2D;

  constructor(position: Vec2D, direction: Vec2D) {
    super();
    this.position = position;
    this.direction = direction;
  }

  getPosition(): Vec2D {
    return [...this.position];
  }

  setPosition(position: Vec2D) {
    this.position = position;
  }

  getDirection(): Vec2D {
    return [...this.direction];
  }

  setDirecion(vec: Vec2D) {
    this.direction = vec;
  }

  translate(displacement: Vec2D) {
    this.position[0] += displacement[0];
    this.position[1] += displacement[1];
  }

  rotate(angle: number) {
    const current_rad = vectorToRad(this.direction);
    const new_rad = current_rad + angleToRad(angle);
    this.direction = radToVector(new_rad);
  }
}
