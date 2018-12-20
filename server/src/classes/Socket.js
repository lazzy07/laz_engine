const io = require('socket.io')();
import { ADD_MONITOR, ADD_CONTROLLER } from "../data_types";
import Monitor from "./Monitor";
import {addToControllerList, addToMonitorList} from "../index"
import Controller from "./Controller";
export default class Socket{
  /**
   * Initialize socket server
   * @param {number} port port that socket server gong to run
   */
  static initServer(port) {
    io.on('connection', (client) => {
      console.log("Client initiated");
      
      client.on("GET_TOURNAMENT_LIST", ()=> {
        console.log("lol");
      })
  
      client.on(ADD_MONITOR, (data) => {
        let m = new Monitor(client, data.payload.name);
        addToMonitorList(m);
      })
  
      client.on(ADD_CONTROLLER, () => {
        let c = new Controller(client);
        addToControllerList(c);
      })

    });

    io.listen(port);
    console.log('LAZ engine server listening on port ', port);
  }

  /**
   * Send data to monitors
   * @param {Object} data data to be sent to monitor includes type and payload 
   */
  static sendDataToMonitors(data){
    switch(data.type){
      default:
        console.log("ERROR ::: Wrong data in parser");
    }
  }

  /**
   * Send data to controllers
   * @param {Object} data data to be sent to controllers includes type and payload 
   */
  static sendDataToControllers(data){
    switch(data.type){
      default:
        console.log("ERROR ::: Wrong data in parser");
    }
  }
}