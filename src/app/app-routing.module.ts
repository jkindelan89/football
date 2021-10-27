import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeaguesComponent} from "./pages/leagues/leagues.component";

const routes: Routes = [
  { path: '', component: LeaguesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
