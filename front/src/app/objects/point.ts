export class Point {

  x: number
  y: number
  control: boolean
  isDragging: boolean;

  constructor(x: number, y: number, control = false, isDragging = false) {
    this.x = x;
    this.y = y;
    this.control = control;
    this.isDragging = isDragging
  }


  draw(ctx: CanvasRenderingContext2D) {

    ctx.save(); // save() na poczatku i restore() na koncu

    ctx.translate(this.x, this.y);
    ctx.fillStyle = this.control ? 'red' : 'black';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2)
    ctx.fill();

    ctx.restore()// save() na poczatku i restore() na koncu

  }


  hitTest(x:number,y:number){
    let dx = this.x - x;
    let dy = this.y - y;
    let dd= Math.sqrt((dx*dx) + (dy*dy));
    return dd <20;
  }

}
