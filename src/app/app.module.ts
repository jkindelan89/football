import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {ImageModule} from 'primeng/image';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {LeaguesComponent} from "./pages/leagues/leagues.component";
import { LoadingComponent } from './components/loading/loading.component';
import {ListComponent} from "./pages/teams/list/list.component";
import { ItemListComponent } from './components/item-list/item-list.component';
import { EditComponent } from './pages/teams/edit/edit.component';
import {FormsModule} from "@angular/forms";
import { LeagueDetailsComponent } from './components/league-details/league-details.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LeaguesComponent,
    ListComponent,
    LoadingComponent,
    ItemListComponent,
    EditComponent,
    LeagueDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    MenubarModule,
    CardModule,
    ImageModule,
    ProgressSpinnerModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
