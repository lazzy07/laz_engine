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

export const SET_MATCH_CONFIG = "SET_MATCH_CONFIG";
export const RESET_MATCH_CONFIG = "RESET_MATCH_CONFIG";

export const SET_BOWLING_END = "SET_BOWLING_END";
export const SET_SHOT_POS = "SET_SHOT_POS";
export const SET_RUNS = "SET_RUNS";
export const SET_EXTRAS = "SET_EXTRAS";
export const SET_WICKET = "SET_WICKET";
export const SET_CATCHER = "SET_CATCHER";
export const SET_OUT = "SET_OUT";
export const SET_BOWLER = "SET_BOWLER";
export const SET_BATSMEN = "SET_BATSMEN";
export const SET_BATSMAN = "SET_BATSMAN";


/**
 * Monitor Data
 */
export const CONTROLLERS_AVAILABLE = "CONTROLLERS_AVAILABLE";
export const NO_CONTROLLERS = "NO_CONTROLLERS";
export const REGISTER_MONITOR = "REGISTER_MONITOR";
export const SET_TYPE = "SET_TYPE"; //setting background video type football || cricket || rugby

//List of video background files {football, cricket, rugby}
export const FILE_LIST = "FILE_LIST";

//Changing monitor's screens must include {type}
export const SET_MONITOR = "SET_MONITOR";