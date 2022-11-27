import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Particle} from "../../objects/particle";
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import colormap from "colormap";


@Component({
  selector: 'app-fifteenth-particles',
  templateUrl: './fifteenth-particles.component.html',
  styleUrls: ['./fifteenth-particles.component.scss']
})
export class FifteenthParticlesComponent implements OnInit, OnDestroy {

  ease = require('eases')

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  particles: Particle[] = []
  x: number = 0;
  y: number = 0;
  particle!: Particle;
  cursor = {x: 9999, y: 9999}
  radiusRandomCircle: number = 75;
  radius = 7;

  numCircles = 12
  gapCircle = 8
  gapDot = 4
  dotRadius = 7;
  cirRadius = 0;
  fitRadius = this.dotRadius

  animationID!: number;

  constructor() {
  }

  ngOnInit(): void {
    this.prepareCanvas('black');

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

        this.radius = this.dotRadius

        let particle = new Particle(x, y, this.radius);
        this.particles.push(particle)
      }
      this.cirRadius += this.fitRadius *2 + this.gapCircle;
      this.dotRadius = (1-this.ease.quadOut(i/this.numCircles)) * this.fitRadius;
    }


    //code for random particles in circle
    // for (let i = 0; i < 300; i++) {
    //   let x = WIDTH_CANVAS / 2;
    //   let y = HEIGHT_CANVAS / 2;
    //   let particle = this.setRandomParticlesInCircle( x, y, this.radius);
    //   this.particles.push(particle)
    // }
    this.animate()
    this.canvas.nativeElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
  }

  ngOnDestroy(){
    window.cancelAnimationFrame(this.animationID)
  }

  setRandomParticlesInCircle(x: number, y: number, radius: number): Particle {
    let random_angle = Math.random() * 2 * Math.PI;
    let random_radius = Math.random() * radius * radius;
    let temX = Math.sqrt(random_radius) * Math.cos(random_angle);
    let temY = Math.sqrt(random_radius) * Math.sin(random_angle);
    return new Particle(x + temX, y + temY)
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

    console.log(this.cursor)
  }

  onMouseUp() {
    this.canvas.nativeElement.removeEventListener('mousemove', (e) => this.onMouseMove(e));
    this.canvas.nativeElement.removeEventListener('mouseup', (e) => this.onMouseUp());

    this.cursor.x = 9999;
    this.cursor.y = 9999;
  }

  playAudio() {

  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }

  private animate() {

    this.prepareCanvas('black')

    this.particles.sort((a,b)=> a.scale - b.scale)

    this.particles.forEach(particle => {
      particle.update(this.cursor.x, this.cursor.y)
      particle.draw(this.ctx)
    })

    this.animationID = window.requestAnimationFrame(() => this.animate());
  }

}
