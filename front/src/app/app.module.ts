import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstComponent } from './pages/first/first.component';
import { SecondComponent } from './pages/second-house/second.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {SquareComponent} from "./objects/square/square.component";
import {ElementComponent} from "./objects/element/element.component";
import { ThirdComponent } from './pages/third-rectangle/third.component';
import { FourthComponent } from './pages/fourth-rombuses/fourth.component';
import { RandomcolorModule } from 'angular-randomcolor';
import { FifthComponent } from './pages/fifth/fifth.component';
import {CanvasPreparer} from "./objects/canvas-preparer";
import { SixthArcComponent } from './pages/sixth-arc/sixth-arc.component';
import { SeventhNetComponent } from './pages/seventh-net/seventh-net.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";
import { EighthFlowersComponent } from './pages/eighth-flowers/eighth-flowers.component';
import { TenthPickFlowersComponent } from './pages/tenth-pick-flowers/tenth-pick-flowers.component';
import { EleventhSoundComponent } from './pages/eleventh-sound/eleventh-sound.component';
import { TwelfthSoundCircleComponent } from './pages/twelfth-sound-circle/twelfth-sound-circle.component';
import { ThirteenthSoundCircle2Component } from './pages/thirteenth-sound-circle2/thirteenth-sound-circle2.component';
import { FourteenthComponent } from './pages/fourteenth/fourteenth.component';
import { FifteenthParticlesComponent } from './pages/fifteenth-particles/fifteenth-particles.component';
import { SixteenthPhotoComponent } from './pages/sixteenth-photo/sixteenth-photo.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {ScrollingModule} from "@angular/cdk/scrolling";


@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    PageNotFoundComponent,
    SquareComponent,
    ElementComponent,
    ThirdComponent,
    FourthComponent,
    FifthComponent,
    SixthArcComponent,
    SeventhNetComponent,
    EighthFlowersComponent,
    TenthPickFlowersComponent,
    EleventhSoundComponent,
    TwelfthSoundCircleComponent,
    ThirteenthSoundCircle2Component,
    FourteenthComponent,
    FifteenthParticlesComponent,
    SixteenthPhotoComponent,
  ],
  imports: [
    MatButtonModule,
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RandomcolorModule,
    FlexLayoutModule,
    FormsModule,
    MatListModule,
    MatCardModule,
    ScrollingModule,

  ],
  providers: [CanvasPreparer ],
  bootstrap: [AppComponent]
})
export class AppModule { }
