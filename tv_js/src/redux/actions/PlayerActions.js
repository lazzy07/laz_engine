/**
 * @author Lasanta M Senanayake
 * lazzy07
 * Cyborg studios production
 */

import Socket from "../../socket/Socket";

export const GET_PLAYER_LIST = "GET_PLAYER_LIST";
export const PLAYER_LIST = "PLAYER_LIST";

export const SET_PLAYER_DATA = "SET_PLAYER_DATA";
export const SET_PLAYER_DATA_OK = "SET_PLAYER_DATA_OK";

export const getPlayerList = tournamentId => {
  return dispatch => {
    Socket.socket.emit(GET_PLAYER_LIST, tournamentId);

    Socket.socket.on(PLAYER_LIST, data => {
      dispatch({ type: PLAYER_LIST, payload: data });
    });
  };
};

export const setPlayerData = data => {
  return dispatch => {
    Socket.socket.emit(SET_PLAYER_DATA, data);
  };
};
