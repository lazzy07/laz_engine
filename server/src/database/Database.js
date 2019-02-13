import mongoose from "mongoose";
import { printC, printError } from "../classes/Console";
import { firestore } from "../firebase";
import { addInningInitialData, ballInitial } from "../functions";

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
          config.overs = "6";
          config.ballsPerOver = "6";

          config.playersPerTeam = "6";
          config.teamSize = "8";

          config.pointsPerWin = "3";
          config.pointsPerDraw = "1";
          config.pointsPerLoss = "0";

          config.freeHit = true;
          config.pointsPerWide = "1";
          config.pointsPerNoball = "1";

          config.pointsPerBoundary = "4";
          config.pointsPerSix = "6";

          config.changeSides = true;
          config.extraCountAsABall = false;

          config.tournamentType = "group/knockout"
          break;
          
        case "football":
          config = {};

          config.miniutesPermatch = "15";
          config.penaltySize = "5";

          config.playersPerTeam = "11";
          config.teamSize = "15";

          config.pointsPerWin = "3";
          config.pointsPerDraw = "1";
          config.pointsPerLoss = "0";

          config.tournamentType = "group/knockout";
          break;

        case "rugby":
          config = {};

          config.miniutesPermatch = "15";
          config.penaltySize = "3";

          config.playersPerTeam = "7";
          config.teamSize = "10";

          config.pointsPerTry = "3";
          config.pointsPerDropKick = "1";
          config.canDropKick = true;

          config.pointsPerWin = "3";
          config.pointsPerDraw = "1";
          config.pointsPerLoss = "0";

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
        firestore
          .collection("users")
          .doc("antiraggers15")
          .collection("tournaments")
          .doc(newData._id.toString())
          .set(saveData);

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
      tournamentDB.findOne({_id: data}).then(newData => {
        if(newData){
          printC("database", "server", "TOURNAMENT_DATA " + newData.name);
          resolve(newData);
        }else{
          printError("database", "server", "ERR:::");
          reject({message: "ERROR::: No data found"});
        }
        
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
        firestore
          .collection("users")
          .doc("antiraggers15")
          .collection("tournaments")
          .doc(data._id.toString())
          .update(data);
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
                savedMembers.push(savedData._id.toString());
                firestore
                    .collection("users")
                    .doc("antiraggers15")
                    .collection("players")
                    .doc(savedData._id.toString())
                    .set(teamMember);
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
                firestore
                  .collection("users")
                  .doc("antiraggers15")
                  .collection("teams")
                  .doc(savedData._id.toString())
                  .set({teamName: data.teamName, group: data.group, players: savedMembers});
                resolve(savedData);
              }).catch(err => {
                reject(err);
              })
            }
          })
        }else{
          let team = new teamDB({teamName, tournament, group, players: savedMembers});
          team.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("teams")
              .doc(savedData._id.toString())
              .set({teamName, tournament, group, players: savedMembers});
            resolve(savedData);
          }).catch(err => {
            reject(err);
          }) 
        }
      })
    })
  }

  /**
   * Get team data from the local database
   * @param {String} tournamentId id of the tournament
   */
  static getTeamData = tournamentId => {
    return new Promise((resolve, reject) => {
      teamDB.find({tournament: tournamentId}).then(foundData => {
        resolve(foundData)
      }).catch(err => {
        reject(err);
      })
    })
  }

  /**
   * Set match data (initialize the match)
   * @param {Object} data match data
   */
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
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(savedData._id.toString())
              .set({teams: [selected1._id, selected2._id], match: matchName, tournament: tournamentId, group, status: "none"});
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
          firestore
            .collection("users")
            .doc("antiraggers15")
            .collection("matches")
            .doc(savedData._id.toString())
            .set({teams: [selected1._id, selected2._id], match: matchName, tournament: tournamentId, group, status: "none"});
          resolve(savedData);
        }).catch(err => {
          reject(err);
        })
      }
    })
  }

  static setMatchConfig = (data) => {
    return new Promise((resolve, reject) => {
      const {_id, match} = data;
      matchDB.findOne({_id: match}).then(foundData => {
        if(foundData){
          foundData.config = data.data;
          let initData1 = addInningInitialData({...data.data, inning: 1});
          let initData2 = addInningInitialData({...data.data, inning: 2});
          let matchD = {
            inning1: initData1,
            inning2: initData2
          }
          foundData.matchData = matchD;
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(match)
              .update({config: data.data, matchData: matchD});

            resolve(savedData)
          }).catch(err => {
            printError("database", "server", "ERR:::" + err.message);
            reject(err);
          })
        }else{
          printError("database", "server", "Match Not Found to updt:config");
        }
      })
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
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("players")
              .doc(savedData._id.toString())
              .set({fName, lName, nickName});
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

  static setBallData = (data) => {
    let {matchId} = data;
    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        let overData = foundData.data;
        firestore
          .collection("users")
          .doc("antiraggers15")
          .collection("matches")
          .doc(match)
          .update({matchData: data});
      }).catch(err => {
        reject(err);
      })
    })
  }

  static resetMatchConfig = data => {
    let {tournamentId, matchId} = data;
    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          foundData.config = {};
          foundData.data = {}
  
          foundData.save().then(savedData => {
            firestore
            .collection("users")
            .doc("antiraggers15")
            .collection("matches")
            .doc(matchId)
            .update({config: {}, data: {}});

            resolve(savedData)
          }) 
        }else{
          reject({message: "data not found"})
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  static setBowlingEnd = data => {
    let {matchId, inning, over, bowlingEnd} = data;
    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          foundData.matchData["inning"+ inning][parseInt(over)].bowlingEnd = bowlingEnd;
          if(foundData.config.changeSides){
            let overInt = parseInt(over)%2;
            let nxtState = "Top";
            if(bowlingEnd === "Top"){
              nxtState = "Bottom"
            }
            for(let i=parseInt(over)+1; i<foundData.matchData["inning"+ inning].length; i++){
              if(i%2 === overInt){
                foundData.matchData["inning"+ inning][i].bowlingEnd = bowlingEnd;
              }else{
                foundData.matchData["inning"+ inning][i].bowlingEnd = nxtState;
              }
            }
          }
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: data not found"})
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  static setRuns = data => {
    let {matchId, inning, over, ball, runs} = data;
    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          let ovr = parseInt(over);
          let bl = parseInt(ball);

          // if(foundData.matchData["inning"+inning][ovr].balls[bl].runs === "?"){
          //   if(ovr !== 0 && bl !== 0){
          //     if(bl !== 0){
          //       let lastBall = foundData.matchData["inning"+inning][ovr].balls[bl-1];
          //       foundData.matchData["inning"+inning][ovr].balls[bl].batsmen = lastBall.batsmen;
          //       if(lastBall.runs !== "?"){
          //         if(parseInt(lastBall.runs)%2 === 1){
          //           if(lastBall.batsmen.length === 2){
          //             if(lastBall.batsman === lastBall.batsmen[0]){
          //               foundData.matchData["inning"+inning][ovr].balls[bl].batsman = lastBall.batsmen[1]
          //             }else{
          //               foundData.matchData["inning"+inning][ovr].balls[bl].batsman = lastBall.batsmen[0]
          //             }
          //           }
          //         }
          //       }              
          //     }else{
          //       let overLen = foundData.matchData["inning"+inning][ovr-1].length-1;
          //       let lastBall = foundData.matchData["inning"+inning][ovr-1][overLen];
          //       foundData.matchData["inning"+inning][ovr].balls[bl].batsmen = lastBall.batsmen;
          //       if(lastBall.runs !== "?"){
          //         if(parseInt(lastBall.runs)%2 === 1){
          //           if(lastBall.batsmen.length === 2){
          //             if(lastBall.batsman === lastBall.batsmen[0]){
          //               foundData.matchData["inning"+inning][ovr].balls[bl].batsman = lastBall.batsmen[0]
          //             }else{
          //               foundData.matchData["inning"+inning][ovr].balls[bl].batsman = lastBall.batsmen[1]
          //             }
          //           }
          //         }
          //       }
          //     }
          //   }
          // }
          foundData.matchData["inning"+inning][ovr].balls[bl].runs = runs;

          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

              resolve(savedData);
          })
        }else{
          reject({message: "ERROR::: Data not found"})
        }
      }).catch(err => {
        reject(err);
      })
    })
  }

  static setExtras = data => {
    let {extra, matchId, inning, over, ball} = data;
    let ovr = parseInt(over);
    let bl = parseInt(ball);
    let inn = "inning"+inning;
    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          if(!foundData.config.extraCountAsABall){
            let newBall = ballInitial();
            newBall.inning = inning;
            newBall.over = over;
            newBall.ball = foundData.matchData[inn][ovr].balls.length.toString();
            if(foundData.matchData[inn][ovr].balls[bl].extra === "No extras"){
              foundData.matchData[inn][ovr].balls.push(newBall)
            }else{
              if(extra === "No extras"){
                foundData.matchData[inn][ovr].balls.splice(bl+1, 1);
              }
            }
          }

          foundData.matchData[inn][ovr].balls[bl].extra = extra;
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: Message not found"})
        }
      })
    })
  }

  static setWicket = data => {
    let {wicket, matchId, inning, over, ball} = data;
    let ovr = parseInt(over);
    let bl = parseInt(ball);
    let inn = "inning"+inning;

    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          foundData.matchData[inn][ovr].balls[bl].wicket = wicket;
          foundData.matchData[inn][ovr].balls[bl].out = foundData.matchData[inn][ovr].balls[bl].batsman;
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: Data not found"})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setCatcher = data => {
    let {catcher, matchId, inning, over, ball} = data;
    let ovr = parseInt(over);
    let bl = parseInt(ball);
    let inn = "inning"+inning;

    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          foundData.matchData[inn][ovr].balls[bl].catcher = catcher;
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: Data not found"})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setOut = data => {
    let {out, matchId, inning, over, ball} = data;
    let ovr = parseInt(over);
    let bl = parseInt(ball);
    let inn = "inning"+inning;

    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          foundData.matchData[inn][ovr].balls[bl].out = out;
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: Data not found"})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setBatsmen = data => {
    let {batsmen, batsman, matchId, inning, over, ball} = data;
    let ovr = parseInt(over);
    let bl = parseInt(ball);
    let inn = "inning"+inning;

    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          foundData.matchData[inn][ovr].balls[bl].batsmen = batsmen;

          for(let i=ovr; i<foundData.matchData[inn].length; i++){
            for(let j= ovr === i ? bl: 0; j< foundData.matchData[inn][i].balls.length; j++){
              foundData.matchData[inn][i].balls[j].batsmen = batsmen;
            }
          }
          if(batsman !== undefined){
            foundData.matchData[inn][ovr].balls[bl].batsman = batsman;
          }
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: Data not found"})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setBowler = data => {
    let {bowler, matchId, inning, over, ball} = data;
    let ovr = parseInt(over);
    let bl = parseInt(ball);
    let inn = "inning"+inning;

    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          for(let i=bl; i<foundData.matchData[inn][ovr].balls.length; i++){
            if(!foundData.matchData[inn][ovr].balls[i].bowler){
              foundData.matchData[inn][ovr].balls[i].bowler = bowler;
            }
          }
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: Data not found"})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setBatsman = data => {
    let {batsman, matchId, inning, over, ball} = data;
    let ovr = parseInt(over);
    let bl = parseInt(ball);
    let inn = "inning"+inning;

    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          foundData.matchData[inn][ovr].balls[bl].batsman = batsman;
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: Data not found"})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setShot = data => {
    let {shot, matchId, inning, over, ball} = data;
    let ovr = parseInt(over);
    let bl = parseInt(ball);
    let inn = "inning"+inning;

    return new Promise((resolve, reject) => {
      matchDB.findOne({_id: matchId}).then(foundData => {
        if(foundData){
          foundData.matchData[inn][ovr].balls[bl].shot = shot;
          foundData.markModified('matchData.inning'+inning);
          foundData.save().then(savedData => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(matchId)
              .update({matchData: savedData.matchData});

            resolve(savedData)
          })
        }else{
          reject({message: "ERROR::: Data not found"})
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  static setCurrentMatch = data => {
    let {matchId} = data;
    return new Promise((resolve, reject) => {
      matchDB.findOne({status: "current"}).then(foundData => {
        if(foundData){
          foundData.status = "none";
          foundData.save().then(() => {
            firestore
              .collection("users")
              .doc("antiraggers15")
              .collection("matches")
              .doc(foundData._id.toString())
              .update({status: "current"});
            matchDB.findOne({_id: matchId}).then(foundData => {
              if(foundData){
                foundData.status = "current";
                foundData.save().then((savedData) => {
                  firestore
                    .collection("users")
                    .doc("antiraggers15")
                    .collection("matches")
                    .doc(matchId)
                    .update({status: "current"});
                  resolve(savedData);
                })
              }else{
                reject({message: "ERROR::: Match not found"})
              }
            })
          })
        }else{
          matchDB.findOne({_id: matchId}).then(foundData => {
            if(foundData){
              foundData.status = "current";
              foundData.save().then((savedData) => {
                firestore
                  .collection("users")
                  .doc("antiraggers15")
                  .collection("matches")
                  .doc(matchId)
                  .update({status: "current"});
                resolve(savedData);
              })
            }else{
              reject({message: "ERROR::: Match not found"})
            }
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
    
  }
}

export default Database;