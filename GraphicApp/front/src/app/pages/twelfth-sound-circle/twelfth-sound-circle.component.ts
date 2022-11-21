import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import eases from 'eases';
import {HEIGHT_CANVAS, WIDTH_CANVAS} from "../../objects/global-variabels";
import {Utils} from "../../objects/utils";

@Component({
  selector: 'app-twelfth-sound-circle',
  templateUrl: './twelfth-sound-circle.component.html',
  styleUrls: ['./twelfth-sound-circle.component.scss']
})
export class TwelfthSoundCircleComponent implements OnInit {

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

  numCircles = 5;
  numSlices = 9;
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

    let cradius = this.radius
    let mapped
    let bin

    for (let i = 0; i < this.numCircles * this.numSlices; i++) {
      bin = Utils.randomRange(2, 32)
      if (Math.random() > 0.7) bin = 0;
      this.bins.push(bin)
    }

    for (let i = 0; i < this.numCircles; i++) {
      let t = i / (this.numCircles - 1)
      this.lineWidth = this.ease.quadIn(t) * 100 + 20;
      this.lineWidths.push(this.lineWidth)
    }

    this.analyserNode.getFloatFrequencyData(this.audioData)

    this.ctx.save()
    this.ctx.translate(WIDTH_CANVAS * 0.5, HEIGHT_CANVAS * 0.5)

    for (let i = 0; i < this.numCircles; i++) {
      this.ctx.save()
      for (let j = 0; j < this.numSlices; j++) {
        this.ctx.rotate(this.slice)
        // this.ctx.lineWidth = this.lineWidths[i];

        bin = this.bins[i * this.numSlices + j]
        if (!bin) continue;
        mapped = Utils.mapRange(this.audioData[Math.floor(bin)], this.maxDb, this.minDb, 1, 0)
        this.lineWidth = this.lineWidths[i] * mapped;

        this.ctx.lineWidth = this.lineWidth;

        this.ctx.beginPath()
        this.ctx.arc(0, 0, cradius + this.ctx.lineWidth * 0.5, 0, this.slice);
        this.ctx.fillStyle = "black";
        this.ctx.stroke();
      }

      cradius += this.lineWidths[i]
      this.ctx.restore();
    }
    this.ctx.restore();

    window.requestAnimationFrame(() => this.animate());
  }


  createAudio() {

    this.audio = new Audio();
    // this.audio.src = '../../../assets/mp3/mixkit.mp3'
    this.audio.src = '../../../assets/mp3/morphed.mp3'
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
