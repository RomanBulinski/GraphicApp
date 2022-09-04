import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Point} from "../../objects/point";
import {CanvasPreparer} from "../../objects/canvas-preparer";
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";

@Component({
  selector: 'app-sixth-arc',
  templateUrl: './sixth-arc.component.html',
  styleUrls: ['./sixth-arc.component.scss']
})
export class SixthArcComponent implements OnInit {


  isDrawing = false;
  x = 0;
  y = 0;

  points = [
    new Point(100, 270),
    new Point(350, 150),
    new Point(440, 270),
    new Point(300, 350),
    new Point(320, 450)
  ]

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private ngZone: NgZone,
              private canvasPreparer: CanvasPreparer
  ) {
  }

  ngOnInit(): void {

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {

        this.prepareCanvas('white');

        this.drawCurve(this.ctx)
        this.points.forEach(point => point.draw(this.ctx))

        this.canvas.nativeElement.addEventListener('mousedown', (e) => this.mousedown(e))
        this.canvas.nativeElement.addEventListener('mousemove', (e) => this.mouseMove(e));
        this.canvas.nativeElement.addEventListener('mouseup', (e) => this.mouseUp());

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
  }

  mousedown(e: MouseEvent) {

    let hit = false

    this.points.forEach(point => {
      point.isDragging = point.hitTest(e.offsetX, e.offsetY)
      if(!hit && point.isDragging){
        hit = true
      }
    })

    if(!hit){
      this.points.push(new Point(e.offsetX,e.offsetY))
    }

  }

  mouseUp() {
    this.points.forEach(point => {
      point.isDragging = false
    })
  }

  mouseMove(e: MouseEvent) {
    this.points.forEach(point => {
      if (point.isDragging) {
        point.x = e.offsetX;
        point.y = e.offsetY;
      }
    })
  }

  private drawCurve(ctx: CanvasRenderingContext2D) {

    ctx.save()// save() na poczatku i restore() na koncu


    ctx.strokeStyle = '#999'
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y)
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y)
    }
    ctx.stroke() //rysowanie ołówkiem


    // ctx.beginPath();
    // ctx.moveTo(this.points[0].x, this.points[0].y)
    // for(let i=1; i< this.points.length; i+=2){
    //   ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y)
    // }
    // ctx.stroke() //rysowanie ołówkiem

    ctx.beginPath();
    for (let i = 0; i < this.points.length - 1; i++) {
      let curr = this.points[i]
      let next = this.points[i + 1]

      let mx = curr.x + (next.x - curr.x) * 0.5;
      let my = curr.y + (next.y - curr.y) * 0.5;

      //draw mindpoints
      // ctx.beginPath();
      // ctx.arc(mx , my, 5,0,Math.PI * 2 );
      // ctx.fillStyle = 'blue';
      // ctx.fill();

      if (i === 0) ctx.moveTo(curr.x, curr.y)
      else if (i === this.points.length - 2) ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y)
      else ctx.quadraticCurveTo(curr.x, curr.y, mx, my)

    }

    ctx.lineWidth = 4;
    ctx.strokeStyle = 'blue'
    ctx.stroke();

    ctx.restore() // save() na poczatku i restore() na koncu
  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }


}
