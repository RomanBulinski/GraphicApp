import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import eases from "eases";
import {Utils} from "../../objects/utils";
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";

@Component({
  selector: 'app-thirteenth-sound-circle2',
  templateUrl: './thirteenth-sound-circle2.component.html',
  styleUrls: ['./thirteenth-sound-circle2.component.scss']
})
export class ThirteenthSoundCircle2Component implements OnInit {

  ease = eases;

  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', {static: true}) canvas!: ElementRef<HTMLCanvasElement>;

  audio!: HTMLAudioElement;
  audioContext?: AudioContext;
  audioData: any;
  sourceNode: any;
  analyserNode: any;

  avg: number = 0;
  mapped: number = 0;
  bins: number[] = [];
  lineWidths: number[] = [];
  lineWidth = 0;
  rotationOffsets: number[] = []

  numCircles = 7;
  numSlices = 1;
  slice = (Math.PI * 2) / this.numSlices;
  radius = 50;
  minDb: number = 0;
  maxDb: number = 0;

  constructor() {
  }

  ngOnInit(): void {

    this.createAudio();
    this.playAudio();
    this.prepareCanvas('#EEEAE0');
    // this.addListeners();
    this.animate();
  }


  private animate() {

    this.prepareCanvas('#EEEAE0');

    let cradius = this.radius;
    let mapped;
    let bin;
    let phi;

    for (let i = 0; i < this.numCircles * this.numSlices; i++) {
      bin = Utils.randomRange(2, 32)
      this.bins.push(bin)
    }

    for (let i = 0; i < this.numCircles; i++) {
      let t = i / (this.numCircles - 1)
      this.lineWidth = this.ease.quadIn(t) * 100 + 10;
      this.lineWidths.push(this.lineWidth)
    }

    for (let i = 0; i < this.numCircles; i++) {
      this.rotationOffsets.push( Utils.randomRange(Math.PI * -0.25, Math.PI * 0.25) - Math.PI * 0.5);
    }

    this.analyserNode.getFloatFrequencyData(this.audioData)

    this.ctx.save()
    this.ctx.translate(WIDTH_CANVAS * 0.5, HEIGHT_CANVAS * 0.5)
    this.ctx.scale(1, -1)

    for (let i = 0; i < this.numCircles; i++) {
      cradius += this.lineWidths[i] *0.5 +2;
      this.ctx.rotate(this.rotationOffsets[i])
      this.ctx.save()
      for (let j = 0; j < this.numSlices; j++) {
        this.ctx.rotate(this.slice)
        this.ctx.lineWidth = this.lineWidths[i];

        bin = this.bins[i * this.numSlices + j]
        mapped = Utils.mapRange(this.audioData[Math.floor(bin)], this.maxDb, this.minDb, 1, 0)

        phi = this.slice * mapped

        this.ctx.beginPath()
        this.ctx.arc(0, 0, cradius, 0, phi);
        this.ctx.fillStyle = "black";
        this.ctx.stroke();
      }

      cradius += this.lineWidths[i] *0.5;
      this.ctx.restore();
    }
    this.ctx.restore();

    window.requestAnimationFrame(() => this.animate());
  }


  createAudio() {

    this.audio = new Audio();
    this.audio.src = '../../../assets/mp3/mixkit.mp3'
    // this.audio.src = '../../../assets/mp3/morphed.mp3'
    this.audioContext = new AudioContext();

    this.sourceNode = this.audioContext.createMediaElementSource(this.audio)
    this.sourceNode.connect(this.audioContext.destination)

    this.analyserNode = this.audioContext.createAnalyser();
    this.analyserNode.fftSize = 512;
    this.analyserNode.smoothingTimeConstant = 0.9;
    this.sourceNode.connect(this.analyserNode);

    this.minDb = this.analyserNode.minDecibels;
    this.maxDb = this.analyserNode.maxDecibels;

    this.audioData = new Float32Array(this.analyserNode.frequencyBinCount);
  }

  playAudio() {
    this.audio.load();
    this.audio.autoplay = true;
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

  addListeners() {
    window.addEventListener('mouseup', () => {

      // if (!this.audioContext) this.createAudio()
      //
      // if (this.audio.paused) {
      //   this.audio.load();
      //   this.audio.autoplay = true;
      //
      // } else {
      //   this.audio.pause();
      // }
      //
      // this.analyserNode.getFloatFrequencyData(this.audioData)
      // this.avg = this.getAverage(this.audioData)
      // this.prepareCanvas('white');
      // this.drawCircle(this.avg);
    });
  }

}
