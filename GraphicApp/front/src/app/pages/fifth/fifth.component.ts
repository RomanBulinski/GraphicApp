import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Point} from "../../objects/point";
import {CanvasPreparer} from "../../objects/canvas-preparer";
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";

@Component({
  selector: 'app-fifth',
  templateUrl: './fifth.component.html',
  styleUrls: ['./fifth.component.scss']
})
export class FifthComponent implements OnInit {

  isDrawing = false;
  x = 0;
  y = 0;

  points = [
    new Point(100, 270),
    new Point(350, 150, true),
    new Point(440, 270)
  ]

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  constructor() {}

  ngOnInit(): void {

        this.prepareCanvas('white');

        this.canvas.nativeElement.addEventListener('mousedown', (e) => this.mousedown(e))
        this.canvas.nativeElement.addEventListener('mousemove', (e) => this.mouseMove(e));
        this.canvas.nativeElement.addEventListener('mouseup', (e) => this.mouseUp());

  }

  mousedown(e: MouseEvent) {
    this.x = e.offsetX;
    this.y = e.offsetY;
    this.isDrawing = true;
  }

  mouseUp() {
    if (this.isDrawing) {
      this.isDrawing = false;
    }
  }

  mouseMove(e: MouseEvent) {
    if (this.isDrawing) {
      this.drawLine(this.ctx, this.x, this.y, e.offsetX, e.offsetY);
      this.x = e.offsetX;
      this.y = e.offsetY;
    }
  }

  private drawLine(context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 10;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

  public prepareCanvas(color: string ) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }

}
