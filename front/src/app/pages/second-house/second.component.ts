import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  WIDTH = 540;
  HEIGHT = 540;
  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {

    this.canvas.nativeElement.width = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.ngZone.runOutsideAngular(() => {

      let frame = 0;
      let x = 0;
      let y = 0;

      const loop = () => {

        // this.fillCanvas();

        if (x > 200) {
          y += 220
          x = 0
        }
        this.drawHouse(x, y, frame)
        x += 10;
        frame += 1;

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
  }

  private fillCanvas(): void {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  private drawHouse(x: number, y: number, frame: number): void {

    this.ctx.fillStyle = (frame % 2) ? 'white' : 'black';
    this.ctx.strokeStyle = this.ctx.fillStyle;

    //set line width
    this.ctx.lineWidth = 10;
    //wall
    this.ctx.strokeRect(x + 75, y + 140, 150, 110);
    //door
    this.ctx.fillRect(x + 130, y + 190, 40, 60);
    //roof
    this.ctx.beginPath();
    this.ctx.moveTo(x + 50, y + 140);
    this.ctx.lineTo(x + 150, y + 60);
    this.ctx.lineTo(x + 250, y + 140);
    this.ctx.closePath();
    this.ctx.stroke();
  }

}
