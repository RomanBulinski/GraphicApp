import {Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import {SimplePoint} from "../../objects/simplePoint";
import SimplexNoise from 'simplex-noise';
import {Utils} from "../../objects/utils";

// import {colors} from "@angular/cli/utilities/color";

@Component({
  selector: 'app-seventh-net',
  templateUrl: './seventh-net.component.html',
  styleUrls: ['./seventh-net.component.scss']
})
export class SeventhNetComponent implements OnInit, OnDestroy {

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  cols = 70;
  rows = 5;
  numCells = 0;
  points: SimplePoint[] = []
  maxWidth = 2
  startRatio = 0.5
  lengthRatio = 150

  //grid
  gridW: any;
  gridH: any;
  //cell
  cellW: any
  cellH: any
  //margin
  marignX: any
  marginY: any

  RANDOM: any
  FREQUENCY: any
  AMPLITUDE: any

  lineWidth: number = 5;
  color: string = "";

  animationID = 0;
  ref: number = 0;

  constructor(private ngZone: NgZone,) {
  }

  ngOnInit(): void {

    this.RANDOM = new SimplexNoise(Math.random);
    this.FREQUENCY = 0.002
    this.AMPLITUDE = 90

    // let colors = createColormap({
    //   colormap: 'magma',
    //   nshades: amplitude,
    //   format: 'hex',
    //   alpha: 1
    // })

    this.prepareCanvas('black');
  }

  public animate() {
    this.prepareCanvas('black');
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols - 1; c++) {
        this.points[r * this.cols + c + 0].y = this.points[r * this.cols + c + 1].y
      }
      this.points[r * this.cols + this.cols - 1].y = this.points[r * this.cols].y
    }
    this.translateAndDraw();
    this.animationID = window.requestAnimationFrame(() => this.animate())
  }

  action() {
    // window.cancelAnimationFrame(this.animationID)
    this.prepareCanvas('black');
    this.setParameters();
    this.points = this.setPointsInArray(this.RANDOM, this.FREQUENCY, this.AMPLITUDE);
    this.translateAndDraw();
  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }

  setParameters(): void {
    //grid
    this.gridW = WIDTH_CANVAS * 0.8 //grid Width
    this.gridH = HEIGHT_CANVAS * 0.8 //grid Width
    //cell
    this.cellW = this.gridW / this.cols
    this.cellH = this.gridH / this.rows
    //margin
    this.marignX = (WIDTH_CANVAS - this.gridW) * 0.5;
    this.marginY = (HEIGHT_CANVAS - this.gridH) * 0.5;

    this.numCells = this.cols * this.rows;
  }

  private setPointsInArray(random: SimplexNoise, frequency: number, amplitude: number): SimplePoint[] {

    let tempPoints: SimplePoint[] = []

    for (let i = 0; i < this.numCells; i++) {
      let x = (i % this.cols) * this.cellW;
      let y = Math.floor(i / this.cols) * this.cellH;
      let n = random.noise2D(x * frequency, y * frequency);

      let lineWidth = Utils.mapRange(n * 10, 10, -10, this.maxWidth, 1);
      // let color = colors[Math.floor(Utils.mapRange(n*10 , 10, -10,0,10))];
      let color = Math.floor(0x1000000 * n * 10).toString(16);

      tempPoints.push(new SimplePoint(x + (n * amplitude), y + (n * amplitude), lineWidth, color))
      // tempPoints.push(new SimplePoint(x , y , lineWidth, color))
    }
    return tempPoints;
  }


  private translateAndDraw() {

    this.ctx.save()// save() na poczatku i restore() na koncu
    this.ctx.translate(this.marignX, this.marginY)
    this.ctx.translate(this.cellW * 0.5, this.cellH * 0.5)

    this.ctx.strokeStyle = "red"
    this.ctx.lineWidth = 4

    let lastx: number = 0;
    let lasty: number = 0;

    // draw lines between points
    for (let r = 0; r < this.rows; r++) {
      // this.ctx.beginPath()
      for (let c = 0; c < this.cols - 1; c++) {
        let curr = this.points[r * this.cols + c + 0]
        let next = this.points[r * this.cols + c + 1]

        let mx = curr.x + (next.x - curr.x) * this.startRatio;
        let my = curr.y + (next.y - curr.y) * this.startRatio;

        // linie proste
        // if (!c) this.ctx.moveTo(point.x, point.y)
        // else this.ctx.lineTo(point.x, point.y)

        if (!c) {
          lastx = curr.x;
          lasty = curr.y;
        }

        this.ctx.beginPath()

        this.ctx.lineWidth = curr.lineWidth;
        this.ctx.strokeStyle = "#" + curr.color;

        this.ctx.moveTo(lastx, lasty)
        this.ctx.quadraticCurveTo(curr.x, curr.y, mx, my)

        // łuki
        // if (c === 0) this.ctx.moveTo(curr.x, curr.y)
        // else if (c === this.cols - 2) this.ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y)
        // else this.ctx.quadraticCurveTo(curr.x, curr.y, mx, my)

        this.ctx.stroke()

        // lastx = mx;
        // lasty = my;

        lastx = mx - c / this.cols * this.lengthRatio;
        lasty = my - r / this.rows * this.lengthRatio;
      }
    }
    this.ctx.restore() // save() na poczatku i restore() na koncu
  }

  //for slider
  formatLabel(value: number) {
    this.rows = value;
    return value;
  }

  segmentsSliderOnChange(value: number) {
    if (this.cols !== value) {
      this.cols = value;
      this.action()
    }
  }

  linesSliderOnChange(value: number) {
    if (this.rows !== value) {
      this.rows = value;
      this.action()
    }
  }

  widthSliderOnChange(value: number) {
    if (this.maxWidth !== value) {
      this.maxWidth = value;
      this.action()
    }
  }

  startRatioSliderOnChange(value: number) {
    if (this.startRatio !== value) {
      this.startRatio = value;
      this.action()
    }
  }

  lengthRatioSliderOnChange(value: number) {
    if (this.lengthRatio !== value) {
      this.lengthRatio = value;
      this.action()
    }
  }

  ngOnDestroy(){
    window.cancelAnimationFrame(this.animationID)
  }

}


