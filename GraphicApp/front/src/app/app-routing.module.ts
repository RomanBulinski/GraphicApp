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

const routes: Routes = [

  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: 'third-component', component: ThirdComponent },
  { path: 'fourth-component', component: FourthComponent },
  { path: 'fifth-component', component: FifthComponent },
  { path: 'sixth-component', component: SixthArcComponent },
  { path: 'seventh-component', component: SeventhNetComponent },
  { path: '',   redirectTo: 'seventh-component', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
