/**
 * @author Lasanta M Senanayake
 * lazzy07
 * Cyborg studios production
 */

import Socket from "../../socket/Socket";

export const GET_MATCH_LIST = "GET_MATCH_LIST";
export const MATCH_LIST = "MATCH_LIST";
export const SET_MATCH_DATA = "SET_MATCH_DATA";
export const SET_MATCH_DATA_OK = "SET_MATCH_DATA_OK";

export const SET_MATCH_CONFIG = "SET_MATCH_CONFIG";

export const getMatchesList = tournamentId => {
  return dispatch => {
    Socket.socket.emit(GET_MATCH_LIST, tournamentId);

    Socket.socket.on(MATCH_LIST, data => {
      dispatch({ type: MATCH_LIST, payload: data });
    });
  };
};

/**
 * Sending matchdata to server
 * @param {Object} data data with {tournamentId, team1, team2}
 */
export const setMatch = data => {
  return dispatch => {
    Socket.socket.emit(SET_MATCH_DATA, data);
  };
};

export const startMatch = data => {
  return dispatch => {
    Socket.socket.emit(SET_MATCH_CONFIG, data);
  };
};
