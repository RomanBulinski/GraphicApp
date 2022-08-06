import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {Utils} from "../../objects/utils";
import {Agent} from "../../objects/agent";

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss']
})
export class FirstComponent implements OnInit {

  WIDTH = 540;
  HEIGHT = 540;
  private ctx!: CanvasRenderingContext2D;
  agents: Agent[] = [];

  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {

    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.canvas.nativeElement.width = this.WIDTH;
    this.canvas.nativeElement.height = this.HEIGHT;

    this.fillCanvas();

    for (let i = 0; i < 40; i++) {
      const x = Utils.randomRange(0, this.WIDTH);
      const y = Utils.randomRange(0, this.HEIGHT);
      this.agents.push(new Agent(x, y));
    }
  }

  drawPoint(): void {

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        this.fillCanvas();

        for (let i = 0; i < this.agents.length; i++) {
          const agent = this.agents[i];
          for (let j = i + 1; j < this.agents.length; j++) {
            const otherAgent = this.agents[j];

            const dist = agent.pos.getDistance( otherAgent.pos);

            if (dist > 100) { continue; }

            this.ctx.lineWidth = Utils.mapRange(dist, 100, 0, 6, 1);

            this.ctx.beginPath();
            this.ctx.moveTo(agent.pos.x, agent.pos.y);
            this.ctx.lineTo(otherAgent.pos.x, otherAgent.pos.y);
            this.ctx.stroke();
          }
        }

        this.agents.forEach(agent => {
          agent.update();
          agent.draw(this.ctx);
          agent.bounce(this.WIDTH, this.HEIGHT);
        });

        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
  }

  private fillCanvas(): void {
    this.ctx.fillStyle = 'red' ;
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

}
