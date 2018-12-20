import socket from "socket.io-client";

export default class Socket {
  static ip = null;
  static port = null;
  static socket = null;

  static initSocket(ip, port) {
    Socket.port = port;
    Socket.ip = ip;
    Socket.socket = socket(ip + ":" + port);
  }
}
