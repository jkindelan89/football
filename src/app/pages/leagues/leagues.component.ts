import {Component, OnInit} from '@angular/core';
import {LeagueService} from "../../services/league.service";
import {League} from "../../interfaces/league";
import {Router} from "@angular/router";


@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrls: ['./leagues.component.css'],
})
export class LeaguesComponent implements OnInit {

  constructor(private leaguesService: LeagueService,private router:Router) {
  }

  get leagues(): League[] {
    return this.leaguesService.leagues
  }

  get loading(): boolean {
    return this.leaguesService.loading
  }

  goTo(league:League){
    this.leaguesService.selectedLeague = league;
    this.router.navigate(['/league',league.Identificador])
  }
  ngOnInit(): void {
    this.leaguesService.getAll();
  }
}
