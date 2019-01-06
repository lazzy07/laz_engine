let mongoose = require("mongoose");
let PLAYER_DATABSE = require("../../constants").PLAYER_DATABSE;

let playerSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  nickName: String,
  cricket: Object,
  football: Object,
  rugby: Object
})

let playerDB = mongoose.model(PLAYER_DATABSE, playerSchema);

module.exports = playerDB;