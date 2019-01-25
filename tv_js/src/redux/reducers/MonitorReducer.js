import {
  LOADING,
  SET_TYPE,
  FILE_LIST,
  SET_MONITOR
} from "../actions/MonitorActions";

const initialState = {
  loading: true,
  type: "",
  fileList: null,
  data: {}
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

    case FILE_LIST:
      return {
        ...state,
        fileList: action.payload
      };

    case SET_MONITOR:
      return {
        ...state,
        data: { ...action.payload }
      };
    default:
      return state;
  }
};
