import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FirstComponent} from "./pages/first/first.component";
import {SecondComponent} from "./pages/second-house/second.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {ThirdComponent} from "./pages/third-rectangle/third.component";
import {FourthComponent} from "./pages/fourth-rombuses/fourth.component";
import {FifthComponent} from "./pages/fifth/fifth.component";

const routes: Routes = [

  { path: 'first-component', component: FirstComponent },
  { path: 'second-component', component: SecondComponent },
  { path: 'third-component', component: ThirdComponent },
  { path: 'fourth-component', component: FourthComponent },
  { path: 'fifth-component', component: FifthComponent },
  { path: '',   redirectTo: 'fifth-component', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
