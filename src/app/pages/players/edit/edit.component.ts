import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Team} from "../../../interfaces/team";
import {TeamService} from "../../../services/team.service";
import {LeagueService} from "../../../services/league.service";
import {Location} from "@angular/common";
import {PlayerService} from "../../../services/player.service";
import {Player} from "../../../interfaces/player";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public player: Player = {
    "Nombre del Jugador": "",
    id: "",
    Avatar: "",
    teamId: ""
  };

  constructor(private playerService: PlayerService, private teamService: TeamService, private location: Location, private route: ActivatedRoute) {
  }


  get loadingPlayer(): boolean {
    return this.teamService.loading
  }

  get team(): Team | undefined {
    return this.teamService.selectedTeam;
  }

  goBack() {
    this.location.back();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id') ?? ""
      let teamId = params.get('team') ?? ""
      if (id) {
        this.playerService.getById(id).subscribe((player: Player) => {
          this.player = player;
        });
      }
      this.teamService.getById(teamId);
    })
  }

  save() {
    this.player.teamId = this.team!.id;
    this.playerService.save(this.player).subscribe((value: any) => {
      this.goBack();
    });
  }

}
