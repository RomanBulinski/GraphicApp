export class SimplePoint {

  x: number
  y: number
  lineWidth: number
  color: string

  constructor(x: number, y: number, lineWidth: number, color: string ) {
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    this.color = color;
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
