import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Utils} from "../../objects/utils";
import {Romb} from "../../objects/romb";
import { RandomcolorModule } from 'angular-randomcolor';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss']
})
export class FourthComponent implements OnInit {

  WIDTH_CANVAS = 540;
  HEIGHT_CANVAS = 540;
  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  CANVAS_MIDDLE_X = this.WIDTH_CANVAS * 0.5;
  CANVAS_MIDDLE_Y = this.HEIGHT_CANVAS * 0.5;
  wRomb = this.WIDTH_CANVAS * 0.6;
  hRomb = this.WIDTH_CANVAS * 0.1;

  rectColors = [ this.getRandomColor(), this.getRandomColor(),this.getRandomColor()]
  bgColor = this.getRandomColor()

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {

    this.prepareCanvas();
    this.ctx.fillStyle = "balck";
    this.ctx.fillRect(0, 0, this.WIDTH_CANVAS, this.HEIGHT_CANVAS);
    this.paintCanvas(this.bgColor);

    this.drawTriangle( this.WIDTH_CANVAS/2, 200, this.ctx)

    let rombus: Romb[] = this.prepareDataRombus(this.WIDTH_CANVAS, this.HEIGHT_CANVAS, this.wRomb, this.hRomb);
    rombus.forEach(o => this.drawSkewRect(this.ctx, o.startX, o.startY, o.w, o.h, o.fill, o.stroke, o.blend));


  }

  private drawTriangle(xStart: number, yStart: number, ctx: CanvasRenderingContext2D){

    let radius = 300;
    let angle = Utils.degToRad(60)
    let x = Math.cos(angle) * radius;

    let y = Math.sin(angle) * radius;

    ctx.lineWidth = 10
    ctx.strokeStyle = 'black'

    ctx.save()// save() na poczatku i restore() na koncu

    ctx.translate(xStart, yStart)

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(x, y)
    ctx.lineTo(- radius/2, y)
    ctx.closePath()

    ctx.stroke() //rysowanie ołówkiem

    this.ctx.clip() //przycinanie

    // ctx.restore()// save() na poczatku i restore() na koncu
  }



  private prepareDataRombus(widthCanvas: number, heightCanvas: number, w: number, h: number): Romb[] {
    let rombus: Romb[] = [];

    for (let n = 0; n < 30; ++n) {

      let romb = {
        startX: Utils.randomRange(-100, widthCanvas - this.wRomb / 2),
        startY: Utils.randomRange(-100, heightCanvas - this.hRomb / 2),
        w: w * Utils.randomRange(0.4, 2),
        h: h * Utils.randomRange(0.2, 3),
        // fill: `rgb(${Utils.randomRange(0, 255)},${Utils.randomRange(0, 255)},${Utils.randomRange(0, 255)},1)`,
        // stroke: `rgb(${Utils.randomRange(0, 255)},${Utils.randomRange(0, 255)},${Utils.randomRange(0, 255)},1)`
        fill: this.rectColors[Math.round( Utils.randomRange(0,2) )],
        stroke: this.rectColors[Math.round( Utils.randomRange(0,2) )],
        blend: ( Math.random()>0.5 ? 'overlay' : 'source-over' )
      } as Romb;

      rombus.push(romb)
    }
    return rombus;
  }


  private drawSkewRect(ctx: CanvasRenderingContext2D,
                       xStart: number, yStart: number,
                       w: number, h: number,
                       fill: string, stroke: string, blend: string) {

    ctx.save()// save() na poczatku i restore() na koncu

    ctx.translate(-this.WIDTH_CANVAS/2, -200)
    ctx.translate(xStart, yStart)

    this.ctx.globalCompositeOperation = blend

    let radius = w;
    let angle = Utils.degToRad(30)
    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;

    ctx.translate(xStart, yStart)

    //rysowanie liniami
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(x, y)
    ctx.lineTo(x, y + h)
    ctx.lineTo(0, h)
    ctx.closePath()

    ctx.lineWidth = 10
    ctx.strokeStyle = stroke //kolor dla rysownia
    ctx.fillStyle = fill //kolor dla wypełnienia

    ctx.shadowColor = 'rgb(0,0,0,0.5)'
    ctx.shadowOffsetX = -5
    ctx.shadowOffsetY = 10

    ctx.fill() // wypełnianie obszary
    ctx.shadowColor = '';
    ctx.stroke() //rysowanie ołówkiem

    ctx.lineWidth = 2
    ctx.strokeStyle = "black"
    ctx.stroke() //rysowanie ołówkiem

    // save() na poczatku i restore() na koncu
    ctx.restore()
  }


  private prepareCanvas() {
    this.canvas.nativeElement.width = this.WIDTH_CANVAS;
    this.canvas.nativeElement.height = this.HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  private paintCanvas(color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, this.WIDTH_CANVAS-4, this.HEIGHT_CANVAS-4);
  }

  private getRandomColor(): string {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

}
