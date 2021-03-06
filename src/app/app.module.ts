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
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {LeaguesComponent} from "./pages/leagues/leagues.component";
import { LoadingComponent } from './components/loading/loading.component';
import {ListComponent as TeamListComponent } from "./pages/teams/list/list.component";
import { ItemListComponent } from './components/item-list/item-list.component';
import { EditComponent } from './pages/teams/edit/edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderDetailsComponent } from './components/header-details/header-details.component';
import {ListComponent as PlayerListComponent} from "./pages/players/list/list.component";
import {EditComponent as PlayerEditComponent} from "./pages/players/edit/edit.component";
import { DetailsComponent } from './pages/players/details/details.component';
import { SearchComponent } from './pages/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LeaguesComponent,
    TeamListComponent,
    LoadingComponent,
    ItemListComponent,
    EditComponent,
    HeaderDetailsComponent,
    PlayerListComponent,
    PlayerEditComponent,
    DetailsComponent,
    SearchComponent
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
    ConfirmDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
