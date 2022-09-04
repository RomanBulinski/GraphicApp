export class SimplePoint {

  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {

    ctx.save(); // save() na poczatku i restore() na koncu

    ctx.translate(this.x, this.y);
    ctx.fillStyle =  'red' ;
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2)
    ctx.fill();

    ctx.restore()// save() na poczatku i restore() na koncu

  }

}
