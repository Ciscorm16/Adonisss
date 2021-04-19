'use strict'
const Sensor = use('App/Models/NoSQL/Sensor');
const Resultado = use('App/Models/NoSQL/Result');
const User = use('App/Models/User');

class HumedadController {
  constructor ({ socket, request, auth }) {
    this.socket = socket
    this.request = request
    this.auth = auth
  }

  async onMessage(data){
    const datoo = await data;
    if (data != datoo){
    this.socket.broadcast("message",datoo);
    console.log(this.socket.id);
    console.log(datoo);
    const user = await this.auth.getUser();
    const sensore = await Sensor.findOne({name:"Humumedad"},{user_id:user.id});
    const idsensor = sensore._id
    const Obj = {
      "sensor_id":idsensor,
      "usuario_id":user.id,
      "Data":datoo
    }
    const dato = new Resultado(Obj);
    dato.save();
    }
  }

  onClose () {
    this.socket.on('close')
  }

  onError () {
    this.socket.on('error')
  }

}

module.exports = HumedadController
