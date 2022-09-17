import {Component, ElementRef, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import {SimplePoint} from "../../objects/simplePoint";
import SimplexNoise from 'simplex-noise';
import {Utils} from "../../objects/utils";

@Component({
  selector: 'app-seventh-net',
  templateUrl: './seventh-net.component.html',
  styleUrls: ['./seventh-net.component.scss']
})
export class SeventhNetComponent implements OnInit {

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  cols = 70;
  rows = 3;
  numCells = 0;
  points: SimplePoint[] = []
  maxWidth = 20

  //grid
  gw:any;
  gh:any;
  //cell
  cw:any
  ch:any
  //margin
  mx:any
  my:any

  RANDOM:any
  FREQUENCY:any
  AMPLITUDE:any

  lineWidth: number = 5;
  color: string = "";

  constructor(private ngZone: NgZone,) {
  }

  ngOnInit(): void {
    this.prepareCanvas('black');
  }

  //for slider
  formatLabel(value: number) {
    this.rows = value;
    return value;
  }

  setParameters(): void {
    //grid
    this.gw = WIDTH_CANVAS * 0.8 //grid Width
    this.gh = HEIGHT_CANVAS * 0.8 //grid Width
    //cell
    this.cw = this.gw / this.cols
    this.ch = this.gh / this.rows
    //margin
    this.mx = (WIDTH_CANVAS - this.gw) * 0.5;
    this.my = (HEIGHT_CANVAS - this.gh) * 0.5;

    this.RANDOM = new SimplexNoise(Math.random);
    this.FREQUENCY = 0.002
    this.AMPLITUDE = 90

    this.numCells = this.cols * this.rows;
  }

  action() {
    // let colors = createColormap({
    //   colormap: 'magma',
    //   nshades: amplitude,
    //   format: 'hex',
    //   alpha: 1
    // })
    this.prepareCanvas('black');
    this.setParameters();
    this.points = this.setPointsInArray(this.RANDOM, this.FREQUENCY, this.AMPLITUDE);
    this.translateAndDraww();
  }

  private translateAndDraww() {

    this.ctx.save()// save() na poczatku i restore() na koncu
    this.ctx.translate(this.mx, this.my)
    this.ctx.translate(this.cw * 0.5, this.ch * 0.5)

    this.ctx.strokeStyle = "red"
    this.ctx.lineWidth = 4

    let lastx: number = 0;
    let lasty: number = 0;

    this.drawLinesBetweenPoints(lastx, lasty);

    this.ctx.restore() // save() na poczatku i restore() na koncu
  }

// draw lines between points
  private drawLinesBetweenPoints(lastx: number, lasty: number) {
    for (let r = 0; r < this.rows; r++) {
      // this.ctx.beginPath()
      for (let c = 0; c < this.cols - 1; c++) {
        let curr = this.points[r * this.cols + c + 0]
        let next = this.points[r * this.cols + c + 1]

        let mx = curr.x + (next.x - curr.x) * 0.5;
        let my = curr.y + (next.y - curr.y) * 0.5;

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

        lastx = mx;
        lasty = my;
      }
    }
  }

  private setPointsInArray(random: SimplexNoise, frequency: number, amplitude: number): SimplePoint[] {

    let tempPoints: SimplePoint[] = []

    for (let i = 0; i < this.numCells; i++) {
      let x = (i % this.cols) * this.cw;
      let y = Math.floor(i / this.cols) * this.ch;
      let n = random.noise2D(x * frequency, y * frequency);

      let lineWidth = Utils.mapRange(n * 10, 10, -10, this.maxWidth, 1);
      // let color = colors[Math.floor(Utils.mapRange(n*10 , 10, -10,0,10))];
      let color = Math.floor(0x1000000 * n * 10).toString(16);

      tempPoints.push(new SimplePoint(x + (n * amplitude), y + (n * amplitude), lineWidth, color))
    }
    return tempPoints;
  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }

}


