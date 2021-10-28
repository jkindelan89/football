import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeaguesComponent} from "./pages/leagues/leagues.component";
import {ListComponent as TeamListComponent} from "./pages/teams/list/list.component";
import {EditComponent as TeamEditComponent} from "./pages/teams/edit/edit.component";

const routes: Routes = [
  { path: '', component: LeaguesComponent },
  { path: 'league/:id', component: TeamListComponent },
  { path: 'team/edit/:league/:team', component: TeamEditComponent },
  { path: 'team/edit/:league', component: TeamEditComponent},
  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
