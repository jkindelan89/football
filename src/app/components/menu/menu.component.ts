import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  term: string = '';

  constructor(private router: Router,private location:Location) {
  }

  ngOnInit() {

  }

  get inRoot(): boolean {
    return this.router.url =="/"
  }
  goBack(){
    this.location.back();
  }
  goToSearch() {
    this.router.navigate(["/search", this.term])
  }
}
