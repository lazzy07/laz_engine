var mongoose = require("mongoose");
var TOURNAMENT_DATABASE = require("../../constants").TOURNAMENT_DATABASE;

var tournamentSchema = new mongoose.Schema({
  id: String,
  name: String,
  logo: String,
  type: String,
  config: Object,
  data: Object
})

var tournamentDB = mongoose.model(TOURNAMENT_DATABASE, tournamentSchema);

module.exports = tournamentDB;