var colors = require('colors');

class ConsoleStylingClass{
  /**
   * Console header printing
   */
  static run(){
    console.log("######          2018 DEC 18       ######");
    console.log("###          LAZ ENGINE v2.0         ###".blue);
    console.log("###      "+new Date().toLocaleString().padEnd(23, " ")+"     ###")
    console.log("\nCreated by @lazzy07".bold.black.bgWhite);
    console.log("________________________________________\n");
  }

  /**
   * Console footer printing
   */
  static finish(){
    console.log("________________________________________");
    console.log("finished @ "+new Date().toLocaleString().padEnd(23, " ")+" ###\n\n\n");
  }
}

/**
 * Printing packet data on scren
 * @param {String} sender sender of the packet
 * @param {String} reciever reciver of the packet
 * @param {String} type type of the data pacekt ex- TOURNAMENT_LIST
 */
export const printC = (sender, reciever, type) => {
  console.log(sender.padEnd(25, " ").green+"\t\t"+reciever.padEnd(25, " ").cyan+"\t\t"+type.padEnd(25, " ").bold.blue);
  // console.table([{sender, reciever, type}]);
}


/**
 * Printing error data on scren
 * @param {String} sender sender of the error
 * @param {String} reciever reciver of the error
 * @param {String} type type of the error ex- ERR::: error
 */
export const printError = (sender, reciever, type) => {
  console.log(sender.padEnd(25, " ").red+"\t\t"+reciever.padEnd(25, " ").red+"\t\t"+type.padEnd(25, " ").bold.red);
  // console.table([{sender, reciever, type}]);
}

export default ConsoleStylingClass;