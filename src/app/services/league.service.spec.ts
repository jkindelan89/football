import { TestBed } from '@angular/core/testing';

import { LeagueService } from './league.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('LeagueService', () => {
  let service: LeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],});
    service = TestBed.inject(LeagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
