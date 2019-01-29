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
export const RESET_MATCH_CONFIG = "RESET_MATCH_CONFIG";

export const SET_MATCH_LISTNERES = "SET_MATCH_LISTNERES";
export const BALL_INFO = "BALL_INFO";
export const SET_BALL_DATA = "SET_BALL_DATA";

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

export const setMatchListners = (tournamentId, match) => {
  return dispatch => {
    Socket.socket.on(BALL_INFO, data => {
      if (tournamentId === data.tournamentId && match === data.matchId) {
        dispatch({ type: BALL_INFO, payload: data });
      }
    });
  };
};

export const resetMatchConfig = (tournamentId, matchId) => {
  Socket.socket.emit(RESET_MATCH_CONFIG, { tournamentId, matchId });
};

export const sendMatchBalldata = (tournamentId, matchId, data) => {
  Socket.socket.emit(SET_BALL_DATA, { tournamentId, matchId, data });
};
