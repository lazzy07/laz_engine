class ConsoleStylingClass{
  static run(){
    console.log("######          2018 DEC 12      ######");
    console.log("###          LAZ ENGINE v2.0        ###");
    console.log("###      "+new Date().toLocaleString()+"     ###")
    console.log("\nCreated by @lazzy07");
    console.log("________________________________________\n");
  }

  static finish(){
    console.log("________________________________________");
    console.log("finished @ "+new Date().toLocaleString()+" ###\n\n\n");
  }
}

export default ConsoleStylingClass;