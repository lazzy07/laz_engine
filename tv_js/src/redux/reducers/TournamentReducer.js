import {
  TOURNAMENT_LIST,
  TOURNAMENT_DATA,
  SET_TOURNAMENT_CONFIG_DATA,
  setTournamentData,
  CHANGE_TOURNAMENT_CONFIG_DATA
} from "../actions/TournamentActions";

const initialState = {
  tournamentList: [],
  tournamentData: {}
};

export const tournamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOURNAMENT_LIST:
      return {
        ...state,
        tournamentList: action.payload
      };

    case TOURNAMENT_DATA:
      return {
        ...state,
        tournamentData: action.payload
      };

    case SET_TOURNAMENT_CONFIG_DATA:
      let data = {
        ...state.tournamentData,
        config: {
          ...action.payload
        }
      };
      setTournamentData(data);
      return {
        ...state,
        tournamentData: data
      };

    case CHANGE_TOURNAMENT_CONFIG_DATA:
      return {
        ...state,
        tournamentData: {
          ...state.tournamentData,
          config: {
            ...state.tournamentData.config,
            ...action.payload
          }
        }
      };

    default:
      return state;
  }
};
