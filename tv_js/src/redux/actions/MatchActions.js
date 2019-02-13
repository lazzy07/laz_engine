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
export const SET_CURRENT_MATCH = "SET_CURRENT_MATCH";

export const SET_MATCH_LISTNERES = "SET_MATCH_LISTNERES";
export const BALL_INFO = "BALL_INFO";

export const SET_BOWLING_END = "SET_BOWLING_END";
export const SET_RUNS = "SET_RUNS";
export const SET_SHOT_POS = "SET_SHOT_POS";
export const SET_EXTRAS = "SET_EXTRAS";
export const SET_WICKET = "SET_WICKET";
export const SET_CATCHER = "SET_CATCHER";
export const SET_OUT = "SET_OUT";
export const SET_BOWLER = "SET_BOWLER";
export const SET_BATSMEN = "SET_BATSMEN";
export const SET_BATSMAN = "SET_BATSMAN";

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
  return dispatch => {
    Socket.socket.emit(RESET_MATCH_CONFIG, { tournamentId, matchId });
  };
};

export const setCurrentMatch = (tournamentId, matchId) => {
  return dispatch => {
    Socket.socket.emit(SET_CURRENT_MATCH, { tournamentId, matchId });
  };
};

export const setBowlingEnd = (
  tournamentId,
  { matchId, inning, over, ball, bowlingEnd }
) => {
  return dispatch => {
    Socket.socket.emit(SET_BOWLING_END, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      bowlingEnd
    });
  };
};

export const setRuns = (
  tournamentId,
  { matchId, inning, over, ball, runs }
) => {
  return dispatch => {
    Socket.socket.emit(SET_RUNS, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      runs
    });
  };
};

export const setExtras = (
  tournamentId,
  { matchId, inning, over, ball, extra }
) => {
  return dispatch => {
    Socket.socket.emit(SET_EXTRAS, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      extra
    });
  };
};

export const setWicket = (
  tournamentId,
  { matchId, inning, over, ball, wicket }
) => {
  return dispatch => {
    Socket.socket.emit(SET_WICKET, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      wicket
    });
  };
};

export const setCatcher = (
  tournamentId,
  { matchId, inning, over, ball, catcher }
) => {
  return dispatch => {
    Socket.socket.emit(SET_CATCHER, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      catcher
    });
  };
};

export const setOut = (tournamentId, { matchId, inning, over, ball, out }) => {
  return dispatch => {
    Socket.socket.emit(SET_OUT, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      out
    });
  };
};

export const setShotPos = (
  tournamentId,
  { matchId, inning, over, ball, shot }
) => {
  return dispatch => {
    Socket.socket.emit(SET_SHOT_POS, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      shot
    });
  };
};

export const setBowler = (
  tournamentId,
  { matchId, inning, over, ball, bowler }
) => {
  return dispatch => {
    Socket.socket.emit(SET_BOWLER, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      bowler
    });
  };
};

export const setBatsmen = (
  tournamentId,
  { matchId, inning, over, ball, batsmen }
) => {
  return dispatch => {
    Socket.socket.emit(SET_BATSMEN, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      batsmen
    });
  };
};

export const setBatsman = (
  tournamentId,
  { matchId, inning, over, ball, batsman }
) => {
  return dispatch => {
    Socket.socket.emit(SET_BATSMAN, {
      tournamentId,
      matchId,
      inning,
      over,
      ball,
      batsman
    });
  };
};
