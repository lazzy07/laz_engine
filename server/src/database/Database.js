import mongoose from "mongoose";



class Database{
  static initDatabase = (databaseConnection) => {
    mongoose.connect(databaseConnection, { useNewUrlParser: true });
    console.log("LAZ engine local databse connected");
  }
}

export default Database;