'use strict'
const Sensor = use('App/Models/NoSQL/Sensor');
const Resultado = use('App/Models/NoSQL/Result');
const User = use('App/Models/User');

class PirController {
  constructor ({ socket, request,auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
  }

  async onMessage(data){
    this.socket.broadcast("message",data);
    console.log(this.socket.id);
    console.log(data);
    const user = await this.auth.getUser();
    const sensore = await Sensor.findOne({name:"Movimiento"},{user_id:this.auth.user.id});
    const idsensor = sensore._id
    const Obj = {
      "sensor":idsensor,
      "user_id":this.auth.user.id,
      "data":data
    }
    const dato = new Resultado(Obj);
    dato.save();
  }

  onClose () {
    this.socket.on('close')
  }

  onError () {
    this.socket.on('error')
  }


}

module.exports = PirController
