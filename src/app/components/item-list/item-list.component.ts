import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() routerLink: (any[] | string | null | undefined);
  @Input() image!: string;
  @Input() name!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
