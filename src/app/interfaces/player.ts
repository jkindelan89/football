import {Team} from "./team";

export interface Player {
  "Nombre del Jugador": string;
  id:                   string;
  Avatar:               string;
  teamId:               string;
  team?:Team;
}
