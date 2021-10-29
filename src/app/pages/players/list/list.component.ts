import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../services/team.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Team} from "../../../interfaces/team";
import {ConfirmationService} from "primeng/api";
import {Location} from "@angular/common";
import {PlayerService} from "../../../services/player.service";
import {Player} from "../../../interfaces/player";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    ConfirmationService,
  ]
})
export class ListComponent implements OnInit {

  constructor(private playerService: PlayerService,
              private teamService: TeamService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private location: Location,
              private confirmationService: ConfirmationService
  ) {
  }

  get team(): Team | undefined {
    return this.teamService.selectedTeam;
  }

  get players(): Player[] {
    return this.playerService.players;
  }

  get loading(): boolean {
    return this.playerService.loading;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let teamId = params.get('id') ?? "";
      this.teamService.getById(teamId).subscribe();
      this.playerService.getAllByTeam(teamId);
    })
  }

  confirmDeleteTeam() {
    this.confirmationService.confirm({
      message: 'Desea eliminar el equipo?',
      header: "Confirmar",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {
        this.teamService.delete().subscribe((value) => {
          this.location.back()
        });
      }
    });
  }


  goToPlayerDetails(player: Player) {
    this.playerService.selectedPlayer = player;
    this.playerService.selectedPlayer.team = this.team;
    this.route.navigate(['player', player.id]);
  }
}
