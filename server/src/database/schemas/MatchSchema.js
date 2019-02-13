let mongoose = require("mongoose");
let MATCH_DATABASE = require("../../constants").MATCH_DATABASE;

let matchSchema = new mongoose.Schema({
  match: String,
  teams: [],
  config: Object,
  time: {type: Number, default: 0},
  data: Object,
  matchData: Object,
  status: {type: String, default: "none"},
  group: String, //A, B, C, .... or || semi, quarter, final
  tournament: String
})

let matchDB = mongoose.model(MATCH_DATABASE, matchSchema);

module.exports = matchDB;