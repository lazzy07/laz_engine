import { combineReducers } from "redux";
import { controllerReducer } from "./ControllerReducer";
import { tournamentReducer } from "./TournamentReducer";

export const rootReducer = combineReducers({
  controller: controllerReducer,
  tournament: tournamentReducer
});
