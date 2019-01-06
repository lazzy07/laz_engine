import { MATCH_LIST } from "../actions/MatchActions";

const initialState = [];

export const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case MATCH_LIST:
      return action.payload;
    default:
      return state;
  }
};
