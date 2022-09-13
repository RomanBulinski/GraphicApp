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
    SeventhNetComponent
  ],
  imports: [
    MatButtonModule,
    MatSliderModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RandomcolorModule,
    FlexLayoutModule
  ],
  providers: [CanvasPreparer],
  bootstrap: [AppComponent]
})
export class AppModule { }
