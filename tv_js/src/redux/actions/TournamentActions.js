import Socket from "../../socket/Socket";

export const GET_TOURNAMENT_LIST = "GET_TOURNAMENT_LIST";

export const getTournamentList = () => {
  return dispatch => {
    Socket.socket.emit(GET_TOURNAMENT_LIST);
  };
};
