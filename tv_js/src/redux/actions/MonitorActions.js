/**
 * @author Lasanta M Senanayake
 * lazzy07
 * Cyborg studios production
 */
import Socket from "../../socket/Socket";
import { firestore } from "../../firebase";

export const REGISTER_MONITOR = "REGISTER_MONITOR";
export const CONTROLLERS_AVAILABLE = "CONTROLLERS_AVAILABLE";
export const NO_CONTROLLERS = "NO_CONTROLLERS";
export const LOADING = "LOADING";
export const SET_TYPE = "SET_TYPE";
export const FILE_LIST = "FILE_LIST";

export const SET_MONITOR = "SET_MONITOR";
export const DISPLAY_INTRO = "DISPLAY_INTRO";
export const DISPLAY_NEXT_MATCH = "DISPLAY_NEXT_MATCH";
export const DISPLAY_GROUP_INFO_CRICKET = "DISPLAY_GROUP_INFO_CRICKET";

/**
 * Registering device as a monitor
 * @param {String} monitorName monitor name
 */
export const registerMonitor = monitorName => {
  return dispatch => {
    Socket.socket.emit(REGISTER_MONITOR, { name: monitorName });

    Socket.socket.on(NO_CONTROLLERS, () => {
      dispatch({ type: LOADING, payload: true });
    });

    Socket.socket.on(CONTROLLERS_AVAILABLE, () => {
      dispatch({ type: LOADING, payload: false });
    });

    Socket.socket.on(FILE_LIST, fileList => {
      dispatch({ type: FILE_LIST, payload: fileList });
    });

    Socket.socket.on(SET_MONITOR, res => {
      dispatch({ type: SET_MONITOR, payload: res });
    });
  };
};

/**
 * Sending data to be displayed on monitors
 * @param {Object} data data including {_id, tournamentName, logo, description}
 */
export const sendToDisplay = data => {
  return dispatch => {
    const { _id } = data;
    Socket.socket.emit(SET_MONITOR, data);
    firestore
      .collection("users")
      .doc("antiraggers15")
      .collection("tournaments")
      .doc(_id)
      .set(data)
      .catch(err => {
        console.log(err);
      });

    Socket.socket.on(SET_MONITOR, res => {
      dispatch({ type: SET_MONITOR, payload: res });
    });
  };
};
