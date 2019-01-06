import { TEAM_DATA } from "../actions/TeamActions";

const initialState = [];

export const teamReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEAM_DATA:
      return action.payload;

    default:
      return state;
  }
};
