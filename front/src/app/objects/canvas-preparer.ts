import {ElementRef} from "@angular/core";

export class CanvasPreparer {

  WIDTH_CANVAS = 540;
  HEIGHT_CANVAS = 540;

  public prepareCanvas(canvas: ElementRef<HTMLCanvasElement>, ctx: CanvasRenderingContext2D ) {
    canvas.nativeElement.width = this.WIDTH_CANVAS;
    canvas.nativeElement.height = this.HEIGHT_CANVAS;
    ctx = canvas.nativeElement.getContext('2d')!;
  }

  public paintCanvas(color: string, ctx: CanvasRenderingContext2D ): void {
    ctx.fillStyle = color;
    ctx.fillRect(2, 2, this.WIDTH_CANVAS - 4, this.HEIGHT_CANVAS - 4);
  }

}
