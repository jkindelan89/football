import {Player} from "./player";

export interface Team {
  "Nombre del equipo": string;
  id:                  string;
  "Logo del Equipo":   string;
  Liga:                string;
  players?:Player[];
}
