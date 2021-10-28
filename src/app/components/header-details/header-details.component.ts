import {Component, Input, OnInit} from '@angular/core';
import {League} from "../../interfaces/league";

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.css']
})
export class HeaderDetailsComponent {

  @Input() image!:string;
  @Input() title!:string;
  constructor() { }


}
