import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {League} from "../interfaces/league";
import {Settings} from "../utils/settings";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private _leagues: League[] = [];
  private _loading: boolean = false;
  private resource: String = "/leagues"

  constructor(private http: HttpClient) {
  }

  get leagues(): League[] {
    return [...this._leagues];
  }

  get loading(): boolean {
    return this._loading;
  }

  getAll(): void {
    this._loading = true;
    this.http.get<League[]>(Settings.API_ENDPOINT + this.resource).subscribe((leagues: League[]) => {
      this._leagues = leagues;
      this._loading = false;
    })
  }
}
