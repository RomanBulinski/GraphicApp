import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Petal} from "../../objects/forFlowers/models/petal";
import {FlowerCenter} from "../../objects/forFlowers/models/flower-center";
import {Flower} from "../../objects/forFlowers/models/flower";
import {Point} from "../../objects/forFlowers/models/point";
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import {BloomingFlowers} from "../../objects/forFlowers/animations/blooming-flowers";

@Component({
  selector: 'app-eighth-flowers',
  templateUrl: './eighth-flowers.component.html',
  styleUrls: ['./eighth-flowers.component.scss']
})
export class EighthFlowersComponent implements OnInit {

  petal = new Petal(new Point(75, 80), 55, 1.2, 75, '#ff1493');
  center = new FlowerCenter(new Point(75, 80), 20, '#ff5a02');
  flower = new Flower(this.center,4, this.petal);

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {
    this.prepareCanvas('white');
    const flowers = new BloomingFlowers(this.canvas.nativeElement);
    flowers.bloom();
  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }

}

