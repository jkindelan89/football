import {Component, OnInit} from '@angular/core';
import {TeamService} from "../../../services/team.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Team} from "../../../interfaces/team";
import {ConfirmationService} from "primeng/api";
import {Location} from "@angular/common";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [
    ConfirmationService,
  ]
})
export class ListComponent implements OnInit {

  constructor(private teamService: TeamService, private route: ActivatedRoute, private confirmationService: ConfirmationService,private location:Location) {
  }

  get team(): Team | undefined {
    return this.teamService.selectedTeam;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let teamId = params.get('id') ?? "";
      this.teamService.getById(teamId).subscribe();
    })
  }

  confirmDeleteTeam() {
    console.log('delete');
    this.confirmationService.confirm({
      message: 'Desea eliminar el equipo?',
      header: "Confirmar",
      acceptLabel: "Si",
      rejectLabel: "No",
      accept: () => {
        this.teamService.delete().subscribe((value)=>{
          this.location.back()
        });
      }
    });
  }


}
