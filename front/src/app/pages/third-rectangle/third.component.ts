import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent implements OnInit {

  WIDTH = 540;
  HEIGHT = 540;
  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.prepareCanvas()
    // this.paintCanvas('grey');

    let x = this.WIDTH * 0.5;
    let y = this.HEIGHT * 0.5;
    let w = this.WIDTH * 0.6;
    let h = this.WIDTH * 0.1;

    // save() na poczatku i restore() na koncu
    this.ctx.save()

    this.ctx.strokeStyle = 'blue'

    // rysowanie bez przeniesienia poczatku ukladu wsp
    // this.ctx.strokeRect((this.WIDTH-w)/2,(this.HEIGHT-h)/2,w,h,);

    //przeniesienie poczatku ukladu wsp, w tym przypadku na srodek canvasu
    this.ctx.translate(x, y)
    this.ctx.translate(w / -2, h / -2)

    // this.ctx.strokeRect(w/-2,h/-2,w,h);
    //to samo
    // this.ctx.strokeRect(w*(-0.5),h*(-0.5),w,h);

    //rysowanie liniami
    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(w, 0)
    this.ctx.lineTo(w, h)
    this.ctx.lineTo(0, h)
    this.ctx.closePath()
    this.ctx.stroke()

    // save() na poczatku i restore() na koncu
    this.ctx.restore()
  }


  private prepareCanvas() {
    this.canvas.nativeElement.width = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  private paintCanvas(color: string): void {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }
}
