import { LOADING, SET_TYPE } from "../actions/MonitorActions";

const initialState = {
  loading: true,
  type: ""
};

export const monitorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case SET_TYPE:
      return {
        ...state,
        type: action.payload
      };
    default:
      return state;
  }
};
