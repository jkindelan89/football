import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import {ImageModule} from 'primeng/image';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {MenuComponent} from './components/menu/menu.component';
import {LeaguesComponent} from "./pages/leagues/leagues.component";
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LeaguesComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MenubarModule,
    CardModule,
    ImageModule,
    ProgressSpinnerModule,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
