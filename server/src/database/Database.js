import mongoose from "mongoose";
import { printC, printError } from "../classes/Console";

const tournamentDB = require("./schemas/TournamentSchema");
const teamDB = require("./schemas/TeamSchema");
const playerDB = require("./schemas/PlayerSchema");
const matchDB = require("./schemas/MatchSchema");

class Database{
  /**
   * Initialize database connection
   */
  static initDatabase = (databaseConnection) => {
    mongoose.connect(databaseConnection, { useNewUrlParser: true });
    console.log("LAZ engine local database connected");
  }

  /**
   * Getting all the tournaments list available
   */
  static getTournamentList = () => {
    return new Promise((resolve, reject) => {
      tournamentDB.find({}).then(data => {
        resolve(data);
      }).catch(e => {
        reject(e.message);
      })
    })
  }

  /**
   * Creating a new tournament
   * @param {Object} data data of the tournament {tournamentName, type}
   * @returns {Promise} promise with saved data
   */
  static createTournament = data => {
    return new Promise((resolve, reject) => {
      let config = {};
      
      switch(data.type){
        case "cricket":
          config = {} 
          config.overs = 6;
          config.ballsPerOver = 6;

          config.playersPerTeam = 6;
          config.teamSize = 8;

          config.pointsPerWin = 3;
          config.pointsPerDraw = 1;
          config.pointsPerLoss = 0;

          config.freeHit = true;
          config.pointsPerWide = 1;
          config.pointsPerNoball = 1;

          config.pointsPerBoundary = 4;
          config.pointsPerSix = 6;

          config.changeSides = true;

          config.tournamentType = "group/knockout"
          break;
          
        case "football":
          config = {};

          config.miniutesPermatch = 15;
          config.penaltySize = 5;

          config.playersPerTeam = 11;
          config.teamSize = 15;

          config.pointsPerWin = 3;
          config.pointsPerDraw = 1;
          config.pointsPerLoss = 0;

          config.tournamentType = "group/knockout";
          break;

        case "rugby":
          config = {};

          config.miniutesPermatch = 15;
          config.penaltySize = 3;

          config.playersPerTeam = 7;
          config.teamSize = 10;

          config.pointsPerTry = 3;
          config.pointsPerDropKick = 1;
          config.canDropKick = true;

          config.pointsPerWin = 3;
          config.pointsPerDraw = 1;
          config.pointsPerLoss = 0;

          config.tournamentType = "group/knockout";
          break;
      }

      let saveData= {
        ...data,
        config
      }

      let newTournament = new tournamentDB(saveData);

      newTournament.save().then(newData => {
        printC("database", "server", "SAVE_SUCCESS " + newData.name);
        resolve(newData);
      }).catch(err => {
        printC("database", "server", "ERR::: "+err.message);
        reject(e.message);
      })
    })
  }

  /**
   * Getting specific tournament data
   * @param {String} id id of the tournament
   * @returns {Promise} returns object with the tournament data
   */
  static getTournamentData = data => {
    return new Promise((resolve, reject) => {
      tournamentDB.findOne({id: data}).then(newData => {
        printC("database", "server", "TOURNAMENT_DATA " + newData.name);
        resolve(newData);
      }).catch(err => {
        printError("database", "server", "ERR:::"+err.message);
        reject(err);
      })
    })
  }

  /**
   * Setting tournament data
   * @param {Object} data object with tournament configurations
   * @returns {Promise} apromise with data that have been saved
   */
  static setTournamentData = data => {
    return new Promise((resolve, reject) => {
      tournamentDB.updateOne({_id: data._id}, {...data}).then(savedData => {
        printC("database", "server", "TOURNAMENT_DATA_UPDATE "+ data.name);
        resolve(data);
      }).catch(err => {
        printError("database", "server", "ERR:::"+err.message);
        reject(err);
      })
    })
  }

  /**
   * Setting team and player data
   * @param {Object} data data about the team {_id: null|| _id (of the team), teamName: name of the team, teamMembers: members of the team}
   */
  static setTeamData = data => {
    return new Promise((resolve, reject) => {
      let {teamMembers, teamName, tournament, _id, group} = data;
      let savedMembers = [];

      let promise = new Promise((resolve, reject) => {
        let counter = 0;
        for(let i=0;i<teamMembers.length;i++){
          playerDB.findOne({fName: teamMembers[i].fName, lName: teamMembers[i].lName}).then(foundData => {
            if(foundData){
              savedMembers.push(foundData._id);
              counter++;
              if(counter === teamMembers.length){
                resolve(savedMembers);
              }
            }else{
              let teamMember = {
                fName: teamMembers[i].fName,
                lName: teamMembers[i].lName,
                nickName: teamMembers[i].nickName
              }
              let player = new playerDB(teamMember);
              player.save().then(savedData => {
                savedMembers.push(savedData._id);
                counter++;
                if(counter === teamMembers.length){
                  resolve(savedMembers);
                }
              }).catch(err => {
                reject(err);
              })
            }
          })
        }
      })

      promise.then(savedMembers => {
        if(_id){
          teamDB.findOne({_id}).then(foundData => {
            if(foundData){
              foundData.teamName = data.teamName;
              foundData.group = data.group;
              foundData.players = savedMembers;
              foundData.save().then(savedData => {
                resolve(savedData);
              }).catch(err => {
                reject(err);
              })
            }
          })
        }else{
          let team = new teamDB({teamName, tournament, group, players: savedMembers});
          team.save().then(savedData => {
            resolve(savedData);
          }).catch(err => {
            reject(err);
          }) 
        }
      })
    })
  }

  static getTeamData = tournamentId => {
    return new Promise((resolve, reject) => {
      teamDB.find({tournament: tournamentId}).then(foundData => {
        resolve(foundData)
      }).catch(err => {
        reject(err);
      })
    })
  }

  static setMatchData = (data) => {
    return new Promise((resolve, reject) => {
      let {_id, tournamentId, matchName, group, selected1, selected2} = data;
      if(_id){
        matchDB.findOne({_id}).then(foundData => {
          foundData.teams = [selected1._id, selected2._id],
          foundData.match = matchName;
          foundData.tournament = tournamentId;
          foundData.group = group;

          foundData.save().then(savedData => {
            resolve(savedData)
          })
        }).catch(err => {
          reject(err);
        })
      }else{
        let newMatch = new matchDB({
          match: matchName,
          tournament: tournamentId,
          group,
          teams: [selected1._id, selected2._id]
        })

        newMatch.save().then(savedData => {
          resolve(savedData);
        }).catch(err => {
          reject(err);
        })
      }
    })
  }

  static getMatchData = tournamentId => {
    return new Promise((resolve, reject) => {
      matchDB.find({tournament: tournamentId}).then(foundData => {
        resolve(foundData);
      }).catch(err => {
        reject(err);
      })
    })
  }

  static setPlayerData = ({_id, fName, lName, nickName}) => {
    return new Promise((resolve, reject) => {
      playerDB.findOne({_id}).then(foundData => {
        if(foundData){
          foundData.fName = fName;
          foundData.lName = lName;
          foundData.nickName = nickName;

          foundData.save().then(savedData => {
            resolve(savedData)
          }).catch(err => {
            reject(err);
          })
        }else{
          reject({message: "Not Found"});
        }
      })
    })
  }

  static getPlayerData = tournamentId => {
    return new Promise((resolve, reject) => {
      teamDB.find({tournament: tournamentId}).then(foundData => {
        let promises = [];
        let teamsLength = foundData.length;

        for(let i=0; i<teamsLength; i++){
          let teamSize = foundData[i].players.length;
          for(let j=0; j< teamSize; j++){
            promises.push(new Promise((res, rej) => {
              playerDB.findOne({_id: foundData[i].players[j]}).then(player => {
                res(player);
              }).catch(err => {
                rej(err);
              })
            }))
          }
        }

        Promise.all(promises).then(values => {
          resolve(values)
        }).catch(err=> {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default Database;