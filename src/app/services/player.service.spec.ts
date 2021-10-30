import {getTestBed, TestBed} from '@angular/core/testing';

import {PlayerService} from './player.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Settings} from "../utils/settings";
import {Player} from "../interfaces/player";

const resource = "/players"
describe('PlayerService', () => {
  let injector: TestBed;
  let service: PlayerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule],});
    service = TestBed.inject(PlayerService);
    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return list players by team', () => {
    const playersDummy: Player[] = [
      {
        "Nombre del Jugador": "Auguste Penwarden",
        "id": "ca85cfed-69d8-4e03-9259-960195bde933",
        "Avatar": "https://robohash.org/etconsequunturreprehenderit.png?size=250x250&set=set1",
        "teamId": "8154f4cb-246b-4bf9-bc64-51f8661b6781"
      },
      {
        "Nombre del Jugador": "Hildegarde Barkas",
        "id": "1e76b39a-78e6-471e-8c4f-d4d7b0a655ff",
        "Avatar": "https://robohash.org/cumquesuntmaiores.png?size=250x250&set=set1",
        "teamId": "7cbd9c6d-e002-4d40-8bfa-f07e943f17a4"
      }
    ];
    const teamId = "team";
    service.getAllByTeam(teamId)

    const req = httpMock.expectOne(Settings.API_ENDPOINT + resource + `?teamId=${teamId}`);
    expect(req.request.method).toBe("GET");
    req.flush(playersDummy);
    expect(service.players.length).toBe(2);
    expect(service.players).toEqual(playersDummy);
  });

  it('return empty list of player', () => {

    const teamId = "";
    service.getAllByTeam(teamId)
    expect(service.players.length).toBe(0);
    httpMock.expectNone(Settings.API_ENDPOINT + resource + `?teamId=${teamId}`);
  });

  it('create player', () => {
    const playertoSave: Player =
      {
        "Nombre del Jugador": "Auguste Penwarden xx",
        "id": "",
        "Avatar": "https://robohash.org/etconsequunturreprehenderit.png?size=250x250&set=set1",
        "teamId": "8154f4cb-246b-4bf9-bc64-51f8661b6781"
      };
    const playerSaved: Player =
      {
        "Nombre del Jugador": "Auguste Penwarden xx",
        "id": "123456789",
        "Avatar": "https://robohash.org/etconsequunturreprehenderit.png?size=250x250&set=set1",
        "teamId": "8154f4cb-246b-4bf9-bc64-51f8661b6781"
      };
    const teamId = "team";
    service.save(playertoSave).subscribe((player: any) => {
      expect(player.id).toEqual(playerSaved.id)
    })

    const req = httpMock.expectOne(Settings.API_ENDPOINT + resource);
    expect(req.request.method).toBe("POST");
    req.flush(playerSaved);
  });

  it('update player', () => {
    const player: Player =
      {
        "Nombre del Jugador": "Auguste Penwarden xx",
        "id": "123456789",
        "Avatar": "https://robohash.org/etconsequunturreprehenderit.png?size=250x250&set=set1",
        "teamId": "8154f4cb-246b-4bf9-bc64-51f8661b6781"
      };
    const teamId = "team";
    service.save(player).subscribe((playerUpdated: any) => {
      expect(playerUpdated).toEqual(player)
    })

    const req = httpMock.expectOne(Settings.API_ENDPOINT + resource+ "/" + player.id);
    expect(req.request.method).toBe("PUT");
    req.flush(player);
  });
});
