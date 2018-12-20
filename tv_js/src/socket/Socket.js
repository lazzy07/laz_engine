import socket from "socket.io-client";

export default class Socket {
  static ip = null;
  static port = null;

  constructor(ip, port) {
    Socket.port = port;
    Socket.ip = ip;
    Socket.initSocket(ip, port);
  }

  static initSocket(ip, port) {
    Socket.socket = socket(ip + ":" + port);
  }
}
