import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FirstComponent} from "./pages/first/first.component";
import {SecondComponent} from "./pages/second-house/second.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ThirdComponent} from "./pages/third-rectangle/third.component";
import {FourthComponent} from "./pages/fourth-rombuses/fourth.component";
import {FifthComponent} from "./pages/fifth/fifth.component";
import {SixthArcComponent} from "./pages/sixth-arc/sixth-arc.component";
import {SeventhNetComponent} from "./pages/seventh-net/seventh-net.component";
import {EighthFlowersComponent} from "./pages/eighth-flowers/eighth-flowers.component";
import {TenthPickFlowersComponent} from "./pages/tenth-pick-flowers/tenth-pick-flowers.component";
import {EleventhSoundComponent} from "./pages/eleventh-sound/eleventh-sound.component";
import {TwelfthSoundCircleComponent} from "./pages/twelfth-sound-circle/twelfth-sound-circle.component";
import {ThirteenthSoundCircle2Component} from "./pages/thirteenth-sound-circle2/thirteenth-sound-circle2.component";

const routes: Routes = [

  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: 'third-component', component: ThirdComponent },
  { path: 'fourth-component', component: FourthComponent },
  { path: 'fifth-component', component: FifthComponent },
  { path: 'sixth-component', component: SixthArcComponent },
  { path: 'seventh-component', component: SeventhNetComponent },
  { path: 'eighth-component', component: EighthFlowersComponent },
  { path: 'tenth-component', component: TenthPickFlowersComponent },
  { path: 'eleventh-component', component: EleventhSoundComponent },
  { path: 'twelfth-component', component: TwelfthSoundCircleComponent },
  { path: 'thirteenth-component', component: ThirteenthSoundCircle2Component },
  { path: '',   redirectTo: 'eighth-component', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
