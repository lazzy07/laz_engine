import { GET_TOURNAMENT_LIST } from "../actions/TournamentActions";
import Socket from "../../socket/Socket";

const initialState = {
  tournamentList: []
};

export const tournamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOURNAMENT_LIST:
      return dispatch => {
        console.log("run");
        Socket.socket.emit(GET_TOURNAMENT_LIST);
      };

    default:
      return initialState;
  }
};
