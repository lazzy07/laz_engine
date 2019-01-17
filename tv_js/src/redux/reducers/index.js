import { combineReducers } from "redux";
import { controllerReducer } from "./ControllerReducer";
import { tournamentReducer } from "./TournamentReducer";
import { matchReducer } from "./MatchReducer";
import { teamReducer } from "./TeamReducer";
import { playerReducer } from "./PlayerReducer";
import { monitorReducer } from "./MonitorReducer";

export const rootReducer = combineReducers({
  controller: controllerReducer,
  tournament: tournamentReducer,
  teams: teamReducer,
  matches: matchReducer,
  players: playerReducer,
  monitor: monitorReducer
});
