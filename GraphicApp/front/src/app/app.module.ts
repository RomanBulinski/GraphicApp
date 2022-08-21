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
    FifthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RandomcolorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
