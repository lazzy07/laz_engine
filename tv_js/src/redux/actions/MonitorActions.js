/**
 * @author Lasanta M Senanayake
 * lazzy07
 * Cyborg studios production
 */
import Socket from "../../socket/Socket";

export const REGISTER_MONITOR = "REGISTER_MONITOR";
export const CONTROLLERS_AVAILABLE = "CONTROLLERS_AVAILABLE";
export const NO_CONTROLLERS = "NO_CONTROLLERS";
export const LOADING = "LOADING";
export const SET_TYPE = "SET_TYPE";

export const registerMonitor = monitorName => {
  return dispatch => {
    Socket.socket.emit(REGISTER_MONITOR, { name: monitorName });

    Socket.socket.on(NO_CONTROLLERS, () => {
      dispatch({ type: LOADING, payload: true });
    });

    Socket.socket.on(CONTROLLERS_AVAILABLE, () => {
      dispatch({ type: LOADING, payload: false });
    });
  };
};
