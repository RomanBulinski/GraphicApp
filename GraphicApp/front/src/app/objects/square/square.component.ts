import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  constructor(
    private ctx: CanvasRenderingContext2D
  ) { }

  draw(x: number, y: number, z: number): void {
    this.ctx.fillRect(z * x, z * y, z, z);
  }

  move(y: number, z: number): void {
    const max = this.ctx.canvas.width / z;
    const canvas = this.ctx.canvas;
    let x = 0;
    const i = setInterval(() => {
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.draw(x, y, z);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 200);
  }

    ngOnInit(): void {
  }

}
