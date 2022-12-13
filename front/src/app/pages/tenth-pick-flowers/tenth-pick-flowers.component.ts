import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import {InteractiveFlowers} from "../../objects/forFlowers/animations/interactive-flowers";

@Component({
  selector: 'app-tenth-pick-flowers',
  templateUrl: './tenth-pick-flowers.component.html',
  styleUrls: ['./tenth-pick-flowers.component.scss']
})
export class TenthPickFlowersComponent implements OnInit {

  private flowers!: InteractiveFlowers;

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {
    this.prepareCanvas('white');
    this.flowers = new InteractiveFlowers(this.canvas.nativeElement);
  }

  public clear(){
    this.flowers.clearCanvas();
    this.prepareCanvas('white');
  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }

}
