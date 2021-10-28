import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {League} from "../interfaces/league";
import {Settings} from "../utils/settings";
import {Team} from "../interfaces/team";

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private _leagues: League[];

  private _loading: boolean = false;
  private resource: String = "/leagues"
  public  selectedLeague?: League;

  constructor(private http: HttpClient) {
    this._leagues = [];
  }

  get leagues(): League[] {
    return [...this._leagues];
  }

  get loading(): boolean {
    return this._loading;
  }

  public reset(): void {
    this._leagues = [];
    this.selectedLeague = undefined;
  }

  public getAll(): void {
    this.reset();
    this._loading = true;
    this.http.get<League[]>(Settings.API_ENDPOINT + this.resource).subscribe((leagues: League[]) => {
      this._leagues = leagues;
      this._loading = false;
    })
  }

  getById(leagueId: string) {
    if (this.selectedLeague?.Identificador == leagueId) return;
    this._loading = true;
    return this.http.get<League[]>(Settings.API_ENDPOINT + this.resource).subscribe((league: League[]
      ) => {
        this._loading = false;
        this.selectedLeague = league.length > 0 ? league[0] : undefined;
      }
    )

  }
}
