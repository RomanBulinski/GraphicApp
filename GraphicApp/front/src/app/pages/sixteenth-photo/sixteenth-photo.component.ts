import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Particle} from "../../objects/particle";
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import {Particle2} from "../../objects/particle2";

@Component({
  selector: 'app-sixteenth-photo',
  templateUrl: './sixteenth-photo.component.html',
  styleUrls: ['./sixteenth-photo.component.scss']
})
export class SixteenthPhotoComponent implements OnInit {
  ease = require('eases')

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  private ctxDama!: CanvasRenderingContext2D | null;
  @ViewChild('canvasDama', {static: true}) canvasDama!: ElementRef<HTMLCanvasElement>;

  private ctxCircle!: CanvasRenderingContext2D | null;
  @ViewChild('canvasCircle', {static: true}) canvasCircle!: ElementRef<HTMLCanvasElement>;


  particles: Particle[] = []
  x: number = 0;
  y: number = 0;
  particle!: Particle;
  cursor = {x: 9999, y: 9999}
  radiusRandomCircle: number = 75;
  radius = 7;

  numCircles = 50
  gapCircle = 1
  gapDot = 1
  dotRadius = 5;
  cirRadius = 0;
  fitRadius = this.dotRadius

  animationID!: number;

  imageDama!: HTMLCanvasElement;
  imageDamaData!: Uint8ClampedArray;

  imageCircle!: HTMLCanvasElement;

  ix!: number;
  iy!:number;
  idx!:number;
  r!:number;
  g!:number;
  b!:number;

  colA!: string;


  constructor() {
  }

  ngOnInit(): void {

    this.prepareCanvas('black');

    this.imageDama = document.getElementById('dama') as HTMLCanvasElement;

    this.canvasDama.nativeElement.width = 64;
    this.canvasDama.nativeElement.height = 64;
    this.ctxDama = this.canvasDama.nativeElement.getContext('2d');
    this.ctxDama!.fillStyle = "blue";
    this.ctxDama!.fillRect(0, 0, 64, 64);

    this.canvas.nativeElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
  }

  onMouseDown(e: MouseEvent) {
    this.canvas.nativeElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.nativeElement.addEventListener('mouseup', (e) => this.onMouseUp());
    this.onMouseMove(e)
  }

  onMouseMove(e: MouseEvent) {
    let x = (e.offsetX / this.canvas.nativeElement.offsetWidth) * this.canvas.nativeElement.width
    let y = (e.offsetY / this.canvas.nativeElement.offsetHeight) * this.canvas.nativeElement.height
    this.cursor.x = x;
    this.cursor.y = y;
    // console.log(this.cursor)
  }

  onMouseUp() {
    this.canvas.nativeElement.removeEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.nativeElement.removeEventListener('mouseup', (e) => this.onMouseUp());
    this.cursor.x = 9999;
    this.cursor.y = 9999;
  }

  loadImage() {
    this.ctxDama!.drawImage(this.imageDama, 0, 0, 64, 64);
    this.ctx.drawImage(this.imageDama, 0, 0, 64, 64);
    this.imageDamaData = this.ctxDama!.getImageData(0, 0, 64, 64).data
  }

  action() {

    for (let i = 0; i < this.numCircles; i++) {
      let circumference = Math.PI * 2 * this.cirRadius;
      let numFit = i ? Math.floor(circumference / (this.fitRadius * 2 + this.gapDot)) : 1;
      let fitSlice = Math.PI * 2 / numFit;
      for (let j = 0; j < numFit; j++) {
        let theta = fitSlice * j;
        let x = Math.cos(theta) * this.cirRadius
        let y = Math.sin(theta) * this.cirRadius

        x += WIDTH_CANVAS / 2;
        y += HEIGHT_CANVAS / 2;

        this.ix = Math.floor((x / WIDTH_CANVAS) * this.imageDama.width)
        this.iy = Math.floor((y / HEIGHT_CANVAS) * this.imageDama.height)
        this.idx = (this.iy * this.imageDama.width + this.ix) * 4

        this.r = this.imageDamaData[this.idx + 0]
        this.g = this.imageDamaData[this.idx + 1]
        this.b = this.imageDamaData[this.idx + 2]

        let colA = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')'
        console.log(colA)

        this.radius = this.dotRadius

        let particle = new Particle2(x, y, this.radius, colA);
        this.particles.push(particle)
      }
      this.cirRadius += this.fitRadius * 2 + this.gapCircle;
      this.dotRadius = (1 - this.ease.quadOut(i / this.numCircles)) * this.fitRadius;
    }
  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }

  animate() {

    this.prepareCanvas('black')

    this.particles.sort((a,b)=> a.scale - b.scale)

    this.particles.forEach(particle => {
      particle.update(this.cursor.x, this.cursor.y)
      particle.draw(this.ctx)
    })
    this.animationID = window.requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(){
    // window.cancelAnimationFrame(this.animationID)
  }

}
