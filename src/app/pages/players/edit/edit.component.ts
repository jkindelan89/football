import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Team} from "../../../interfaces/team";
import {TeamService} from "../../../services/team.service";
import {LeagueService} from "../../../services/league.service";
import {Location} from "@angular/common";
import {PlayerService} from "../../../services/player.service";
import {Player} from "../../../interfaces/player";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  public form!: FormGroup;

  constructor(private playerService: PlayerService,
              private teamService: TeamService,
              private location: Location,
              private route: ActivatedRoute,) {
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
    });
    this.form = new FormGroup({
      name: new FormControl(this.player["Nombre del Jugador"], [Validators.required,]),
      image: new FormControl(this.player.Avatar, Validators.required),
    });
  }

  save() {
    if (this.form.invalid) return;
    this.player.teamId = this.team!.id;
    this.playerService.save(this.player).subscribe((value: any) => {
      this.goBack();
    });
  }

}
