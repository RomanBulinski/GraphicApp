import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import {Particle} from "../../objects/particle";
import {Point} from "../../objects/point";

@Component({
  selector: 'app-fourteenth',
  templateUrl: './fourteenth.component.html',
  styleUrls: ['./fourteenth.component.scss']
})
export class FourteenthComponent implements OnInit {

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  particles: Particle[] = []
  x: number = 0;
  y: number = 0;
  particle!: Particle;
  cursor = {x:9999, y:9999}

  constructor() {
  }

  ngOnInit(): void {
    this.prepareCanvas('black');

    for (let i = 0; i < 1; i++) {
      let x = WIDTH_CANVAS / 2;
      let y = HEIGHT_CANVAS / 2;
      let particle = new Particle(x, y, 5,'white')
      this.particles.push(particle)
    }

    this.animate()

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

    this.particles.forEach(particle => {
      particle.update(this.cursor.x, this.cursor.y)
      particle.draw(this.ctx)
    })

    window.requestAnimationFrame(() => this.animate());
  }


}
