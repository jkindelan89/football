import {Component, Input, OnInit} from '@angular/core';
import {League} from "../../interfaces/league";

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.css']
})
export class LeagueDetailsComponent  {

  @Input() league!:League;
  constructor() { }


}
