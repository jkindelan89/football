import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Settings} from "../utils/settings";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {Player} from "../interfaces/player";

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
    if (!teamId) return;
    this.reset();
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
    return this.http.get<Player>(Settings.API_ENDPOINT + this.resource + "/" + id)
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
}
