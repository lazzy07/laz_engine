/**
 * @author Lasanta M Senanayake
 * lazzy07
 * Cyborg studios production
 */

import Socket from "../../socket/Socket";

export const GET_TOURNAMENT_LIST = "GET_TOURNAMENT_LIST";
export const TOURNAMENT_LIST = "TOURNAMENT_LIST";
export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";

export const CREATE_TOURNAMENT_OK = "CREATE_TOURNAMENT_OK";
export const CREATE_TOURNAMENT_ERROR = "CREATE_TOURNAMENT_ERROR";

export const GET_TOURNAMENT_DATA = "GET_TOURNAMENT_DATA";
export const TOURNAMENT_DATA = "TOURNAMENT_DATA";

export const SET_TOURNAMENT_DATA = "SET_TOURNAMENT_DATA";
export const SET_TOURNAMENT_CONFIG_DATA = "SET_TOURNAMENT_CONFIG_DATA";
export const CHANGE_TOURNAMENT_CONFIG_DATA = "CHANGE_TOURNAMENT_CONFIG_DATA";

/**
 * Loading Tournament List
 */
export const getTournamentList = () => {
  return dispatch => {
    Socket.socket.emit(GET_TOURNAMENT_LIST);

    Socket.socket.on(TOURNAMENT_LIST, data => {
      dispatch({ type: TOURNAMENT_LIST, payload: data });
    });
  };
};

/**
 * Sending data to server that reqired to create new tournament
 * @param {object} data data to be sent to the server {name: tournament name, type: "cricket"||"rugby"||"football"}
 */
export const createNewTournament = data => {
  return dispatch => {
    Socket.socket.emit(CREATE_TOURNAMENT, data);
  };
};

/**
 * Requesting tournament data from the server
 * @param {string} data tournament name
 */
export const getTournamentData = data => {
  return dispatch => {
    Socket.socket.emit(GET_TOURNAMENT_DATA, data);

    Socket.socket.on(TOURNAMENT_DATA, data => {
      dispatch({ type: TOURNAMENT_DATA, payload: data });
    });
  };
};

/**
 * Setting tournament config data
 * @param {Object} data config data
 */
export const setTournamentConfigData = data => {
  return {
    type: SET_TOURNAMENT_CONFIG_DATA,
    payload: data
  };
};

export const setTournamentData = data => {
  Socket.socket.emit(SET_TOURNAMENT_DATA, data);
};

export const setTournamentConfigState = data => {
  return {
    type: CHANGE_TOURNAMENT_CONFIG_DATA,
    payload: data
  };
};
