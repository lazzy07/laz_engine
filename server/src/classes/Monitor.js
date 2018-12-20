export default class Monitor{
  /**
   * Initialize monitor
   * @param {Socket} socket socket of the monitor
   * @param {string} name name of the monitor given at clients end(at monitor login page)
   */
  constructor(socket, name){
    if(name !== "" || undefined || null){
      socket.type="monitor";
      socket.name=name;
      this.name = name;
      this.socket = socket;
    }else{
      return Error("ERROR::: Monitor name is ot defined");
    }
  }

  /**
   * Send data to monitor
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