import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../../services/player.service";
import {TeamService} from "../../../services/team.service";
import {Location} from "@angular/common";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Player} from "../../../interfaces/player";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers:[
    ConfirmationService
  ]
})
export class DetailsComponent implements OnInit {

  constructor(private playerService: PlayerService,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      let playerId = params.get('id') ?? "";
      this.playerService.getById(playerId).subscribe();
    })
  }
  get player():Player|undefined{
    return this.playerService.selectedPlayer;
  }

  confirmDeletePlayer() {
    this.confirmationService.confirm({
      message: 'Desea eliminar el jugador?',
      header: "Confirmar",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {
        this.playerService.delete().subscribe((value) => {
          this.location.back()
        });
      }
    });
  }
}
