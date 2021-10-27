import {Component, OnInit} from '@angular/core';
import {LeagueService} from "../../services/league.service";
import {League} from "../../interfaces/league";
import {Message, MessageService} from "primeng/api";


@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
  providers: [MessageService]
})
export class LeaguesComponent implements OnInit {

  constructor(private leaguesService: LeagueService) {
  }

  get leagues(): League[] {
    return this.leaguesService.leagues
  }

  get loading(): boolean {
    return this.leaguesService.loading
  }

  ngOnInit(): void {
    this.leaguesService.getAll();
  }

  clickLeague(event: any) {
    console.log(event)
  }
}
