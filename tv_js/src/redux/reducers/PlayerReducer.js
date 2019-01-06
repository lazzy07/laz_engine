import { PLAYER_LIST } from "../actions/PlayerActions";

const initialState = [];

export const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAYER_LIST:
      return action.payload;

    default:
      return state;
  }
};
