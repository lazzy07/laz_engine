export default class Controller{
  constructor(socket){
    this.socket = socket;
  }

  /**
   * Send data to controller
   * @param {Object} data data with keys type and payload
   */
  sendData(data){
    if(this.socket){
      this.socket.emit(data.type, data);
    }else{
      Error("ERROR ::: socket for monitor not found");
    }
  }
}