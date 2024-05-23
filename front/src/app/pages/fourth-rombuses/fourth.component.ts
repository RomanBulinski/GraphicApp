import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Utils} from "../../objects/utils";
import {Romb} from "../../objects/romb";
import Rand, {PRNG} from 'rand-seed';
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss']
})
export class FourthComponent implements OnInit {

  WIDTH_CANVAS = WIDTH_CANVAS;
  HEIGHT_CANVAS = HEIGHT_CANVAS;
  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  wRomb = this.WIDTH_CANVAS * 0.6;
  hRomb = this.WIDTH_CANVAS * 0.1;

  rectColors = [this.getRandomColor('aaa1'), this.getRandomColor('aaa2'), this.getRandomColor('aaa3')]
  bgColor = this.getRandomColor('aaa1')

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {

    this.prepareCanvas();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.WIDTH_CANVAS, this.HEIGHT_CANVAS);
    this.paintCanvas(this.bgColor);

    let rombus: Romb[] = this.prepareDataRombuses(this.WIDTH_CANVAS, this.HEIGHT_CANVAS, this.wRomb, this.hRomb);

    // this.drawTriangle(this.WIDTH_CANVAS / 2, 200, this.ctx)

    this.drawPolygon(this.ctx,200,5)

    rombus.forEach(o => this.drawSkewRect(this.ctx, o.startX, o.startY, o.w, o.h, o.fill, o.stroke, o.blend));

  }


  private drawPolygon(ctx: CanvasRenderingContext2D , radius:number, sides:number) {

    let slice = (2*Math.PI)/sides
    let angle = 360/sides

    ctx.save()// save() na poczatku i restore() na koncu
    ctx.translate(this.WIDTH_CANVAS/2, this.HEIGHT_CANVAS/2)

    ctx.beginPath();
    ctx.moveTo(0,-radius); // górny naroznik

    for(let i=1; i<sides; i++ ){
      let theta = Utils.degToRad(angle * i) - (Math.PI / 2)
      ctx.lineTo( Math.cos(theta)*radius, Math.sin(theta)*radius )
    }

    ctx.closePath()

    ctx.lineWidth = 10
    ctx.strokeStyle = 'black'

    ctx.stroke() //rysowanie ołówkiem
    ctx.clip() //przycinanie
  }

  private prepareDataRombuses(widthCanvas: number, heightCanvas: number, w: number, h: number): Romb[] {
    let rombus: Romb[] = [];

    for (let n = 0; n < 50; ++n) {

      let romb = {
        startX: Utils.randomRange(-100, widthCanvas - this.wRomb / 2),
        startY: Utils.randomRange(-100, heightCanvas - this.hRomb / 2),
        w: w * Utils.randomRange(0.4, 2),
        h: h * Utils.randomRange(0.2, 3),
        // fill: `rgb(${Utils.randomRange(0, 255)},${Utils.randomRange(0, 255)},${Utils.randomRange(0, 255)},1)`,
        // stroke: `rgb(${Utils.randomRange(0, 255)},${Utils.randomRange(0, 255)},${Utils.randomRange(0, 255)},1)`
        fill: this.rectColors[Math.round(Utils.randomRange(0, 2))],
        stroke: this.rectColors[Math.round(Utils.randomRange(0, 2))],
        blend: (Math.random() > 0.5 ? 'overlay' : 'source-over')
      } as Romb;

      rombus.push(romb)
    }
    return rombus;
  }

  private drawTriangle(xStart: number, yStart: number, ctx: CanvasRenderingContext2D) {

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
    ctx.lineTo(-radius / 2, y)
    ctx.closePath()

    ctx.stroke() //rysowanie ołówkiem

    ctx.clip() //przycinanie

    // ctx.restore()// save() na poczatku i restore() na koncu
  }

  private drawSkewRect(ctx: CanvasRenderingContext2D,
                       xStart: number, yStart: number,
                       w: number, h: number,
                       fill: string, stroke: string, blend: any) {

    ctx.save()// save() na poczatku i restore() na koncu

    ctx.translate(-this.WIDTH_CANVAS / 2, -200)
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
    this.ctx.fillRect(2, 2, this.WIDTH_CANVAS - 4, this.HEIGHT_CANVAS - 4);
  }

  private getRandomColor(source: string): string {

    //random from Math.random()
    // let color = Math.floor(0x1000000 * Math.random()).toString(16);

    //random from any string
    const rand = new Rand(source, PRNG.xoshiro128ss);
    let color = Math.floor(0x1000000 * rand.next()).toString(16);

    return '#' + ('000000' + color).slice(-6);
  }

}
