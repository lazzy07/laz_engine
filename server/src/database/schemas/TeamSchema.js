let mongoose = require("mongoose");
let TEAMS_DATABASE = require("../../constants").TEAMS_DATABASE;

let teamSchema = new mongoose.Schema({
  teamName: String,
  tournament: String,
  players:[],
  group: String //A, B, C, .... or if no groups ""
})

let tournamentDB = mongoose.model(TEAMS_DATABASE, teamSchema);

module.exports = tournamentDB;