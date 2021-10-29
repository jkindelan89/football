import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PlayerService} from "../../services/player.service";
import {TeamService} from "../../services/team.service";
import {Player} from "../../interfaces/player";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  term!: string;
  searchResult:Player[]=[];
  constructor(private playerService: PlayerService,
              private route:Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.term = params.get('term') ?? "";
      if (this.term==""){
        this.searchResult=[];
        return;
      }
      this.playerService.search(this.term).subscribe(value => {
        this.searchResult=value;
      });
    })
  }
  get loading():boolean{
    return this.playerService.loading;
  }

  goToPlayerDetails(player: Player) {
    this.playerService.selectedPlayer = player;
    this.route.navigate(['player', player.id]);
  }
}
