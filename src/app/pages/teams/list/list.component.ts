import { Component, OnInit } from '@angular/core';
import {TeamService} from "../../../services/team.service";
import {Team} from "../../../interfaces/team";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {LeagueService} from "../../../services/league.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  leagueId!:string;

  constructor(private teamService: TeamService,private leagueService: LeagueService,private activatedRoute: ActivatedRoute,private router:Router) {
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
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.leagueId = params.get('id')??""
      this.teamService.getAllByLeague(this.leagueId);
      this.leagueService.getById(this.leagueId);
    })

  }

  goToTeamDetails(team: Team) {
    this.teamService.selectedTeam = team;
    this.router.navigate(['/team',team.id])
  }
}
