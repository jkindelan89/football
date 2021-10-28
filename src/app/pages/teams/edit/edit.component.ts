import {Component, OnInit} from '@angular/core';
import {Team} from "../../../interfaces/team";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {TeamService} from "../../../services/team.service";
import {LeagueService} from "../../../services/league.service";
import {League} from "../../../interfaces/league";
import {Location} from "@angular/common";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  team: Team = {id: "", "Nombre del equipo": "", "Logo del Equipo": "", Liga: ""};

  constructor(private teamService: TeamService, private leagueService: LeagueService, private location:Location,private route: ActivatedRoute) {
  }

  get loadingTeam():boolean{
    return  this.teamService.loading
  }

  get loadingLeague():boolean{
    return  this.teamService.loading
  }
  goBack(){
    this.location.back();
  }

  get league(){
    return this.leagueService.selectedLeague;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let leagueId = params.get('league') ?? ""
      let teamId = params.get('team') ?? ""
      if(teamId){
        this.teamService.getById(teamId);
      }
      this.leagueService.getById(leagueId);
    })
  }

  save() {
    this.team.Liga = this.league!.Identificador;
    this.teamService.save(this.team).subscribe((value:any) => {
      this.goBack();
    });
  }
}
