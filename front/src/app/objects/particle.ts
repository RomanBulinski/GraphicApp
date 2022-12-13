import {Utils} from "./utils";
import colormap from "colormap";

export class Particle {

  //position
  x: number = 0;
  y: number = 0;

  //acceleration
  ax: number;
  ay: number;

  //velocity
  vx: number;
  vy: number;

  //initial position
  ix: number;
  iy: number;

  radius = 5
  scale = 1

  // minDist = 50;
  minDist = Utils.randomRange(50, 150)
  // pushFactor = 0.02
  pushFactor = Utils.randomRange(0.01, 0.02)
  // pullFactor = 0.004
  pullFactor = Utils.randomRange(0.002, 0.006)
  // dampFactor = 0.95
  dampFactor = Utils.randomRange(0.90, 0.95)

  colormap = require('colormap')
  colors: any;
  idxColor: number = 0;
  color: string = "white";

  constructor(x: number, y: number, radius = 5, colA: string) {
    //position
    this.x = x
    this.y = y

    //acceleration
    this.ax = 0
    this.ay = 0

    //velocity
    this.vx = 0
    this.vy = 0

    //initial position
    this.ix = x
    this.iy = y

    this.radius = radius

    this.colors = colormap({
      colormap: 'viridis',
      nshades: 20,
      format: 'hex',
      alpha: 1
    })

    this.color = colA;

  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * this.scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  update(cursorx: number, cursory: number) {

    let dx;
    let dy;
    let dd;
    let distDelta;

    // this.ax += 0.001

    //pull force
    dx = this.ix - this.x
    dy = this.iy - this.y
    dd = Math.sqrt(dx * dx + dy * dy)

    this.ax = dx * this.pullFactor;
    this.ay = dy * this.pullFactor;

    this.scale = Utils.mapRange2(dd,100,0,5,1)
    this.idxColor = Math.floor(Utils.mapRange2(dd,100,0,this.colors.length-1,0));
    this.color = this.colors[this.idxColor];

    //push force
    dx = this.x - cursorx
    dy = this.y - cursory
    dd = Math.sqrt(dx * dx + dy * dy)

    distDelta = this.minDist - dd;

    if (dd < this.minDist) {
      this.ax += (dx / dd) * distDelta * this.pushFactor;
      this.ay += (dy / dd) * distDelta * this.pushFactor;
    }

    this.vx += this.ax
    this.vy += this.ay

    this.vx *= this.dampFactor
    this.vy *= this.dampFactor

    this.x += this.vx
    this.y += this.vy

  }

}
