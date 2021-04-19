'use strict'

class ResultController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onDataSensor(data) {
    this.socket.broadcast("dataSensor", data)
    console.log(this.socket.id, data);
  }
}

module.exports = ResultController
