import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../services/team.service";
import {Team} from "../../../interfaces/team";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {LeagueService} from "../../../services/league.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  leagueId!:string;

  constructor(private teamService: TeamService,private leagueService: LeagueService,private route: ActivatedRoute) {
  }

  get teams(): Team[] {
    return this.teamService.teams
  }

  get loading(): boolean {
    return this.teamService.loading
  }
  get league(){
    return this.leagueService.selectedLeague;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.leagueId = params.get('id')??""
      this.teamService.getAllByLeague(this.leagueId);
    })

  }

}
