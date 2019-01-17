import Socket from "./classes/Socket";
import ConsoleStylingClass, {printC, printError} from "./classes/Console";
import Database from "./database/Database";

const databaseConnection = "mongodb://127.0.0.1:27017/laz_engine";

let connectionList = [];

/**
 * Add socket to connections list
 * @param {Socket} socket socket to be added to the array
 */
export const addToSocketList = (socket) => {
  connectionList.push(socket);
}

export const removeFromSocketList = (socket) => {
  printError(socket.id,"server","CLIENT_DISCONNECT");
  connectionList.splice(connectionList.indexOf(socket), 1);
}

export const getConnectionList = (socket) => {
  return connectionList
}

/**
 * Checking wether controllers available or not
 * @returns {Boolean} true if controllers available
 */
export const checkForControllers = () => {
  let conList = getConnectionList();
  for(let i=0; i<conList.length; i++){
    if(conList[i].type !== "monitor"){
      return true;
    }
  }
  return false;
}

/**
 * Sending data to all the sockets
 * @param {Object} data data to be sent as {type: string, payload: data}
 */
export const sendToSockets = (data) => {
  for(let i=0; i<connectionList.length; i++){
    printC("server", connectionList[i].id, data.type);
    connectionList[i].emit(data.type, data.payload);
  }
}



//Main Class
class MainClass{
  //Main method
  static main(){
    Database.initDatabase(databaseConnection);
    Socket.initServer(8000);
  }
}
















/* ********************** FOR TESTING *********************** */
//comment when deploying

ConsoleStylingClass.run();
MainClass.main();


/* ********************* FOR DEPLOYMENT ****************** */
//comment when testing

// try{
//   ConsoleStylingClass.run();
//   MainClass.main();
// }catch(err){
//   console.log(err);
//   ConsoleStylingClass.run();
//   MainClass.main();
// }