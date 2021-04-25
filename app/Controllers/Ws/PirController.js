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
    var datito="";
    this.socket.broadcast("message",data);
    console.log(this.socket.id);
    console.log(data);
    const user = await this.auth.getUser();
    const sensore = await Sensor.findOne({name:"Movimiento"},{user_id:this.auth.user.id});
    const idsensor = sensore._id
    const Obj = {
      "sensor_id":idsensor,
      "usuario_id":this.auth.user.id,
      "Data":data
    }
    if(data != datito){
    const dato = new Resultado(Obj);
    dato.save();
    datito = data;
    }
  }

  onClose () {
    this.socket.on('close')
  }

  onError () {
    this.socket.on('error')
  }


}

module.exports = PirController
