import {Vector} from './vector';
import {Utils} from './utils';

export class Agent {

  pos: Vector;
  vel: Vector;
  radius: number;

  constructor(x: number,
              y: number) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(Utils.randomRange(-1, 1), Utils.randomRange(-1, 1));
    this.radius = Utils.randomRange(4, 12);
  }

  bounce(width: number, height: number): void {
    if (this.pos.x <= 0 || this.pos.x >= width) {
      this.vel.x *= -1;
    }
    if (this.pos.y <= 0 || this.pos.y >= height) {
      this.vel.y *= -1;
    }
  }

  update(): void {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  draw(ctx: CanvasRenderingContext2D): void {

    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);

    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

}
