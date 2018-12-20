import { GET_CONTROLLER_LIST } from "../actions/ControllerActions";
import Socket from "../../socket/Socket";

const initialState = {
  controllerList: []
};

export const controllerReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
