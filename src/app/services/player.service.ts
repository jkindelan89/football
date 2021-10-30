import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Settings} from "../utils/settings";
import {forkJoin, Observable, of} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Player} from "../interfaces/player";
import {Team} from "../interfaces/team";


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private _players: Player[];
  public selectedPlayer?: Player;
  private _loading: boolean = false;
  private resource: String = "/players"

  constructor(private http: HttpClient) {
    this._players = [];
  }

  get players(): Player[] {
    return [...this._players];
  }

  get loading(): boolean {
    return this._loading;
  }

  public reset() {
    this._players = [];
    this.selectedPlayer = undefined;
  }

  getAllByTeam(teamId: string): void {
    this.reset();
    if (!teamId) return;
    const params = new HttpParams().set("teamId", teamId);
    this._loading = true;
    this.http.get<Player[]>(Settings.API_ENDPOINT + this.resource, {params}).subscribe((players: Player[]) => {
      this._players = players;
      this._loading = false;
    })
  }

  save(player: Player) {
    if (player.id) {
      return this.http.put(Settings.API_ENDPOINT + this.resource + "/" + player.id, player);
    } else {
      return this.http.post(Settings.API_ENDPOINT + this.resource, player);

    }

  }

  getById(id: string): Observable<Player> {
    if (this.selectedPlayer?.id == id) return of(this.selectedPlayer);
    this._loading = true;
    const params = new HttpParams().set("_expand", 'team');
    return this.http.get<Player>(Settings.API_ENDPOINT + this.resource + "/" + id, {params})
      .pipe(
        switchMap((player: Player) => {
          this.selectedPlayer = player;
          this._loading = false;
          return of(this.selectedPlayer);
        })
      );
  }

  delete() {
    if (this.selectedPlayer) {
      return this.http.delete(Settings.API_ENDPOINT + this.resource + "/" + this.selectedPlayer.id).pipe(
        switchMap((response) => {
          this._loading = false;
          return of(response);
        })
      );
    }
    return of(false);
  }

  search(term: string): Observable<Player[]> {
    this._loading = true;
    const paramsPlayer = new HttpParams().set("_expand", 'team').set('Nombre del Jugador_like', term);
    const paramsTeam = new HttpParams().set("_embed", 'players').set('Nombre del equipo_like', term);
    return forkJoin({
      players: this.http.get<Player[]>(Settings.API_ENDPOINT + this.resource, {params: paramsPlayer}),
      teams: this.http.get<Team[]>(Settings.API_ENDPOINT + "/teams", {params: paramsTeam})
    }).pipe(
      map((response) => {
        const teams: Team[] = response.teams;
        const players: Player[] = response.players;
        let result: Record<string, Player> = {};
        for (const player of players) {
          result[player.id] = player;
        }
        for (const team of teams) {
          if (team.players == undefined) continue;
          const players = team.players!
          team.players = undefined
          for (const player of players!) {
            if (result[player.id] != undefined) continue;
            player.team = team;
            result[player.id] = player;
          }
        }
        this._loading = false;
        return Object.values(result)
      })
    )

  }
}
