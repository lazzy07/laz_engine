let mongoose = require("mongoose");
let MATCH_DATABASE = require("../../constants").MATCH_DATABASE;

let matchSchema = new mongoose.Schema({
  match: String,
  teams: [],
  config: [],
  time: {type: Number, default: 0},
  data: Object,
  tournament: String
})

let matchDB = mongoose.model(MATCH_DATABASE, matchSchema);

module.exports = matchDB;