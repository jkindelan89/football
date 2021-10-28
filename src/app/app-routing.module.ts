import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LeaguesComponent} from "./pages/leagues/leagues.component";
import {ListComponent as TeamListComponent} from "./pages/teams/list/list.component";
import {EditComponent as TeamEditComponent} from "./pages/teams/edit/edit.component";
import {ListComponent as PlayerListComponent} from "./pages/players/list/list.component";
import {EditComponent as PlayerEditComponent} from "./pages/players/edit/edit.component";
import {DetailsComponent as PlayerDetailsComponent} from "./pages/players/details/details.component";

const routes: Routes = [
  { path: '', component: LeaguesComponent },
  { path: 'league/:id', component: TeamListComponent },
  { path: 'team/edit/:league/:team', component: TeamEditComponent },
  { path: 'team/edit/:league', component: TeamEditComponent},
  { path: 'team/:id', component: PlayerListComponent },
  { path: 'player/edit/:team/:id', component: PlayerEditComponent },
  { path: 'player/edit/:team', component: PlayerEditComponent},
  { path: 'player/:id', component: PlayerDetailsComponent },

  { path: '**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
