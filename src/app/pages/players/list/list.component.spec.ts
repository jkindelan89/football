import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {LeagueService} from "../../../services/league.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {PlayerService} from "../../../services/player.service";
import {TeamService} from "../../../services/team.service";
import {ActivatedRoute} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";




describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers:[PlayerService,TeamService],
      imports:[HttpClientTestingModule,RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
