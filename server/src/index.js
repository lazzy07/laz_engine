import Socket from "./classes/Socket";
import ConsoleStylingClass from "./classes/Console";
import Database from "./database/Database";

const databaseConnection = "mongodb://127.0.0.1:27017/laz_engine";

let monitorList = [];
let controllerList = [];

/**
 * Add monitor to monitors list
 * @param {Monitor} monitor monitor to be added to the array
 */
export const addToMonitorList = (monitor) => {
  monitorList.push(monitor);
}

/**
 * Add controller to controllers list
 * @param {Controller} controller controller to be added to the array
 */
export const addToControllerList = (controller) => {
  controllerList.push(controller);
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