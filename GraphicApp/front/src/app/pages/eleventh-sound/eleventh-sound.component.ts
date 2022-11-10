import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";

@Component({
  selector: 'app-eleventh-sound',
  templateUrl: './eleventh-sound.component.html',
  styleUrls: ['./eleventh-sound.component.scss']
})
export class EleventhSoundComponent implements OnInit {

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  audio!: HTMLAudioElement;
  audioContext?: AudioContext;
  audioData: any;
  sourceNode: any;
  analyserNode: any;

  avg: number = 0;

  constructor() {
  }

  ngOnInit(): void {

    this.createAudio();
    this.prepareCanvas('white');
    // this.addListeners();

    this.audio.load();
    this.audio.autoplay = true;

    this.animate();

  }

  private animate() {

    this.analyserNode.getFloatFrequencyData(this.audioData)
    this.avg = this.getAverage(this.audioData)
    this.prepareCanvas('white');
    this.drawCircle(this.avg);

    window.requestAnimationFrame(() => this.animate());
  }


  addListeners() {
    window.addEventListener('mouseup', () => {

      if (!this.audioContext) this.createAudio()

      if (this.audio.paused) {
        this.audio.load();
        this.audio.autoplay = true;

      } else {
        this.audio.pause();
      }

      this.analyserNode.getFloatFrequencyData(this.audioData)
      this.avg = this.getAverage(this.audioData)
      this.prepareCanvas('white');
      this.drawCircle(this.avg);

    });

  }

  playSound() {
    //   this.audio = new Audio();
    //   this.audio.src = '../../../assets/mp3/morphed.mp3'
    this.audio.load();
    this.audio.autoplay = true;
  }

  private drawCircle(ave: number) {
    this.ctx.save()
    this.ctx.translate(WIDTH_CANVAS * 0.5, HEIGHT_CANVAS * 0.5)
    this.ctx.lineWidth = 10;
    this.ctx.beginPath()
    this.ctx.arc(0, 0, Math.abs(ave), 0, Math.PI * 2);
    // this.ctx.arc(0, 0, 50, 0, Math.PI * 2);
    this.ctx.fillStyle = "black";
    this.ctx.stroke();
    this.ctx.restore();
  }

  createAudio() {

    this.audio = new Audio();
    this.audio.src = '../../../assets/mp3/mixkit.mp3'
    // this.audio.src = '../../../assets/mp3/morphed.mp3'

    this.audioContext = new AudioContext();

    this.sourceNode = this.audioContext.createMediaElementSource(this.audio)
    this.sourceNode.connect(this.audioContext.destination)

    this.analyserNode = this.audioContext.createAnalyser();
    this.sourceNode.connect(this.analyserNode);

    this.audioData = new Float32Array(this.analyserNode.frequencyBinCount);
  }

  getAverage(data: any) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i]
    }
    return sum / data.length
  }

  public prepareCanvas(color: string) {
    this.canvas.nativeElement.width = WIDTH_CANVAS;
    this.canvas.nativeElement.height = HEIGHT_CANVAS;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(2, 2, WIDTH_CANVAS - 4, HEIGHT_CANVAS - 4);
  }

}
