const io = require('socket.io')();
import { ADD_MONITOR, ADD_CONTROLLER, GET_TOURNAMENT_LIST, TOURNAMENT_LIST, CREATE_TOURNAMENT, CREATE_TOURNAMENT_OK, CREATE_TOURNAMENT_ERROR, GET_TOURNAMENT_DATA, TOURNAMENT_DATA, SET_TOURNAMENT_DATA, SET_TEAM_DATA, TEAM_DATA, PLAYER_LIST, SAVE_TEAM_OK, MATCH_LIST, GET_MATCH_LIST, GET_PLAYER_LIST, GET_TEAM_DATA, SET_MATCH_DATA_OK, SET_MATCH_DATA, SET_PLAYER_DATA, SET_PLAYER_DATA_OK } from "../data_types";
import Monitor from "./Monitor";
import {addToSocketList, removeFromSocketList, sendToSockets} from "../index"
import Controller from "./Controller";
import Database from "../database/Database";
import { printC, printError } from "./Console";
export default class Socket{
  /**
   * Initialize socket server
   * @param {number} port port that socket server gong to run
   */
  static initServer(port) {
    io.on('connection', (client) => {
      printC(client.id, "server", "CLIENT_INITIATE");
      addToSocketList(client);
      
      client.on(GET_TOURNAMENT_LIST, ()=> {
        printC(client.id, "server", GET_TOURNAMENT_LIST)
        Database.getTournamentList().then((data) => {
          printC("server", client.id, TOURNAMENT_LIST);
          client.emit(TOURNAMENT_LIST,data);
        })
      })
  
      client.on(ADD_MONITOR, (data) => {
        let m = new Monitor(client, data.payload.name);
        addToMonitorList(m);
      })
  
      client.on(ADD_CONTROLLER, () => {
        let c = new Controller(client);
        addToControllerList(c);
      })

      client.on(CREATE_TOURNAMENT, (data) => {
        Database.createTournament(data).then(savedData => {
          Database.getTournamentList().then((tournaments) => {
            sendToControllers({type: TOURNAMENT_LIST, data: tournaments});
            printC("server", client.id, CREATE_TOURNAMENT_OK);
            client.emit(CREATE_TOURNAMENT_OK)
          }).catch(err => {
            printC("server", client.id, CREATE_TOURNAMENT_ERROR);
            client.emit(CREATE_TOURNAMENT_ERROR, err.message);
          })
        })
      })

      client.on(GET_TOURNAMENT_DATA, (data) => {
        printC(client.id, "server", GET_TOURNAMENT_DATA);
        Database.getTournamentData(data).then(tournamentData => {
          printC("server", client.id, TOURNAMENT_DATA + " " + tournamentData.name)
          client.emit(TOURNAMENT_DATA, tournamentData);
        }).catch(err =>{
          console.log(err);
        });
      })

      client.on(SET_TOURNAMENT_DATA, data => {
        printC(client.id, "server", SET_TOURNAMENT_DATA);
        Database.setTournamentData(data).then(savedData => {
          sendToSockets({type: TOURNAMENT_DATA, payload: savedData});
        })
      })

      client.on(SET_TEAM_DATA, data => {
        printC(client.id, "server", SET_TEAM_DATA);
        Database.setTeamData(data).then(savedData => {
          printC("server", client.id, SAVE_TEAM_OK);
          client.emit(SAVE_TEAM_OK);
          Database.getTeamData(data.tournament).then(foundData => {
            sendToSockets({type: TEAM_DATA, payload: foundData});
          })
          Database.getPlayerData(data.tournament).then(players => {
            sendToSockets({type: PLAYER_LIST, payload: players});
          })
        }).catch(err => {
          console.log(err);
          printError("database", "server", SET_TEAM_DATA);
        })
      })

      client.on(GET_MATCH_LIST, data => {
        printC(client.id, "server", GET_MATCH_LIST);
        Database.getMatchData(data).then(foundData => {
          printC("server", client.id, MATCH_LIST);
          client.emit(MATCH_LIST, foundData);
        }).catch(err => {
          printError("databse", "server", MATCH_LIST);
        })
      })

      client.on(GET_TEAM_DATA, data => {
        printC(client.id, "server", GET_TEAM_DATA)
        Database.getTeamData(data).then(foundData => {
          printC("server", client.id, TEAM_DATA);
          client.emit(TEAM_DATA, foundData);
        }).catch(err => {
          printError("database", "server", TEAM_DATA);
        })
      })

      client.on(GET_PLAYER_LIST, data => {
        printC(client.id, "server", GET_PLAYER_LIST);
        Database.getPlayerData(data).then(foundData => {
          sendToSockets({type: PLAYER_LIST, payload: foundData});
        }).catch(err => {
          printError("database", "server", PLAYER_LIST);
        })
      })

      client.on(SET_MATCH_DATA, data => {
        printC(client.id, "server", SET_MATCH_DATA);
        Database.setMatchData(data).then(savedData => {
          client.emit(SET_MATCH_DATA_OK);
          Database.getMatchData(data.tournamentId).then(foundData => {
            sendToSockets({type: MATCH_LIST, payload: foundData})
          }).catch(err => {
            printError("database", "server", MATCH_LIST)
          })
        }).catch(err => {
          console.log(err);
          printError("database", "server", SET_TEAM_DATA)
        })
      })

      client.on(SET_PLAYER_DATA, data => {
        printC(client.id, "server", SET_PLAYER_DATA);
        Database.setPlayerData(data).then(savedData => {
          client.emit(SET_PLAYER_DATA_OK);
          Database.getPlayerData(data.tournamentId).then(foundData => {
            sendToSockets({type: PLAYER_LIST, payload: foundData})          
          }).catch(err => {
            printError("database", "server", PLAYER_LIST)
          })
        }).catch(err => {
          printError("database", "server", SET_PLAYER_DATA);
        })
      })
      
      client.on("disconnect", () => {
        removeFromSocketList(client)
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