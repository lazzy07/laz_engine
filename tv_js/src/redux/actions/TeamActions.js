/**
 * @author Lasanta M Senanayake
 * lazzy07
 * Cyborg studios production
 */

import Socket from "../../socket/Socket";

export const SET_TEAM_DATA = "SET_TEAM_DATA";
export const GET_TEAM_DATA = "GET_TEAM_DATA";
export const TEAM_DATA = "TEAM_DATA";
export const SAVE_TEAM_OK = "SAVE_TEAM_OK";

/**
 * Sending team data to the server
 * @param {Object} data data with team data { @param {String} teamName name of the team, @param {Array} teamMembers team members with fName, lName, nickName}
 */
export const setTeamData = data => {
  return dispatch => {
    Socket.socket.emit(SET_TEAM_DATA, data);
  };
};

/**
 * Get all the teams involved in the tournament
 * @param {String} tournamentId id of the tournament (can found on pathname)
 */
export const getTeamData = tournamentId => {
  return dispatch => {
    Socket.socket.emit(GET_TEAM_DATA, tournamentId);

    Socket.socket.on(TEAM_DATA, data => {
      dispatch({ type: TEAM_DATA, payload: data });
    });
  };
};
