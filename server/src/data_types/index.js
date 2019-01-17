/**
 * ADD_MONITOR
 * data {
 *  type: "ADD_MONITOR" || "ADD_CONTROLLER",
 *  payload: {
 *    name: {string} name of the monitor
 *  }
 * }
 */
export const ADD_MONITOR = "ADD_MONITOR";
export const ADD_CONTROLLER = "ADD_CONTROLLER";

/**
 * Controller asking for tournament list available and the response by the server with data
 */
export const GET_TOURNAMENT_LIST = "GET_TOURNAMENT_LIST";
export const TOURNAMENT_LIST = "TOURNAMENT_LIST";

/**
 * Tournament creation command
 * data {
 *  name: tournament_name,
 *  type: "cricket" "football" "rugby"
 * }
 */
export const CREATE_TOURNAMENT = "CREATE_TOURNAMENT";

/**
 * Create tournament acknowledgements
 */
export const CREATE_TOURNAMENT_OK = "CREATE_TOURNAMENT_OK";
export const CREATE_TOURNAMENT_ERROR = "CREATE_TOURNAMENT_ERROR";

/**
 * Get data of the selected tournament
 */
export const GET_TOURNAMENT_DATA = "GET_TOURNAMENT_DATA";
export const TOURNAMENT_DATA = "TOURNAMENT_DATA";

/**
 * Set tournament data changed by the controller
 */
export const SET_TOURNAMENT_DATA = "SET_TOURNAMENT_DATA";

/**
 * Set team data
 */
export const SET_TEAM_DATA = "SET_TEAM_DATA";

/**
 * Set match data
 */
export const SET_MATCH_DATA = "SET_MATCH_DATA";
export const SET_MATCH_DATA_OK = "SET_MATCH_DATA_OK";

/**
 * Set player data
 */
export const SET_PLAYER_DATA = "SET_PLAYER_DATA";
export const SET_PLAYER_DATA_OK = "SET_PLAYER_DATA_OK";


/**
 * Get data from the server
 */
export const GET_TEAM_DATA = "GET_TEAM_DATA";
export const GET_PLAYER_LIST = "GET_PLAYER_LIST";
export const GET_MATCH_LIST = "GET_MATCH_LIST";

export const TEAM_DATA = "TEAM_DATA";
export const PLAYER_LIST = "PLAYER_LIST";
export const MATCH_LIST = "MATCH_LIST";
export const SAVE_TEAM_OK = "SAVE_TEAM_OK";


/**
 * Monitor Data
 */
export const CONTROLLERS_AVAILABLE = "CONTROLLERS_AVAILABLE";
export const NO_CONTROLLERS = "NO_CONTROLLERS";
export const REGISTER_MONITOR = "REGISTER_MONITOR";
export const SET_TYPE = "SET_TYPE"; //setting background video type football || cricket || rugby