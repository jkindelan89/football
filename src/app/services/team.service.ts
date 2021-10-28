import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Settings} from "../utils/settings";
import {Team} from "../interfaces/team";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private _teams: Team[];
  public selectedTeam?: Team;
  private _loading: boolean = false;
  private resource: String = "/teams"

  constructor(private http: HttpClient) {
    this._teams = [];
  }

  get teams(): Team[] {
    return [...this._teams];
  }

  get loading(): boolean {
    return this._loading;
  }

  public reset() {
    this._teams = [];
    this.selectedTeam = undefined;
  }

  getAllByLeague(leagueId: string): void {
    if (!leagueId) return;
    this.reset();
    const params = new HttpParams().set("Liga", leagueId);
    this._loading = true;
    this.http.get<Team[]>(Settings.API_ENDPOINT + this.resource, {params}).subscribe((teams: Team[]) => {
      this._teams = teams;
      this._loading = false;
    })
  }

  save(team: Team) {
    if (team.id) {
      return this.http.put(Settings.API_ENDPOINT + this.resource + "/" + team.id, team);
    } else {
      return this.http.post(Settings.API_ENDPOINT + this.resource, team);

    }

  }

  getById(id: string) {

    if (this.selectedTeam?.id == id) return;
    this._loading = true;
    return this.http.get<Team>(Settings.API_ENDPOINT + this.resource + "/" + id).subscribe((team: Team) => {
      this._loading = false;
      this.selectedTeam = team;
    })
  }

}
