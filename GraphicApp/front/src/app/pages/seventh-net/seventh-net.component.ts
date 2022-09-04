import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import {SimplePoint} from "../../objects/simplePoint";
import SimplexNoise from 'simplex-noise';

@Component({
  selector: 'app-seventh-net',
  templateUrl: './seventh-net.component.html',
  styleUrls: ['./seventh-net.component.scss']
})
export class SeventhNetComponent implements OnInit {

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  cols = 12;
  rows = 12;
  numCells = this.cols * this.rows;

  //grid
  gw = WIDTH_CANVAS * 0.8 //grid Width
  gh = HEIGHT_CANVAS * 0.8 //grid Width
  //cell
  cw = this.gw / this.cols
  ch = this.gh / this.rows
  //margin
  mx = (WIDTH_CANVAS - this.gw) * 0.5;
  my = (HEIGHT_CANVAS - this.gh) * 0.5;

  points: SimplePoint[] = []

  constructor(private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
    this.prepareCanvas('black');

    const random = new SimplexNoise(Math.random);
    let frequency = 0.002
    let amplitude = 90

    // prepare points in array
    for (let i = 0; i < this.numCells; i++) {
      let x = (i % this.cols) * this.cw;
      let y = Math.floor(i / this.cols) * this.ch;
      let n = random.noise2D(x * 0.002, y * 0.002);

      this.points.push(new SimplePoint(x + (n * 75), y + (n * 75)))
    }

    this.ctx.save()// save() na poczatku i restore() na koncu
    this.ctx.translate(this.mx, this.my)
    this.ctx.translate(this.cw * 0.5, this.ch * 0.5)

    this.ctx.strokeStyle = "red"
    this.ctx.lineWidth = 4

    // draw lines between points
    for (let r = 0; r < this.rows; r++) {
      this.ctx.beginPath()


      for (let c = 0; c < this.cols -1; c++) {
        let curr = this.points[r * this.cols + c + 0]
        let next = this.points[r * this.cols + c + 1]

        let mx = curr.x + (next.x - curr.x) * 0.5;
        let my = curr.y + (next.y - curr.y) * 0.5;

        // if (!c) this.ctx.moveTo(point.x, point.y)
        // else this.ctx.lineTo(point.x, point.y)

        if (c === 0) this.ctx.moveTo(curr.x, curr.y)
        else if (c === this.cols - 2) this.ctx.quadraticCurveTo(curr.x, curr.y, next.x, next.y)
        else this.ctx.quadraticCurveTo(curr.x, curr.y, mx, my)

      }
      this.ctx.stroke()
    }

    //draw points
    this.points.forEach(point =>
      point.draw(this.ctx))

    this.ctx.restore() // save() na poczatku i restore() na koncu

  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }
}
