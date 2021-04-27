'use strict'

const Sensor = use('App/Models/NoSQL/Sensor')

class SensorController {
    async store({response, auth}) {
        const user = await auth.getUser()
        // const user = user

        const newSensor =
            {'user_id':user.id, 'name' : 'Temperatura', 'description' : 'Sensor que captura la temperatura y el porcentaje de humedad conectado al pin 1.'}
        const sensor = new Sensor(newSensor)
        await sensor.save()
        const newSensor2 =
            {'user_id':user.id, 'name' : 'Movimiento', 'description' : 'Sensor PIR, captura si hay movimiento conectado al pin 2.'}
        const sensor2 = new Sensor(newSensor2)
        await sensor2.save()
        const newSensor3 =
            {'user_id':user.id, 'name' : 'Distancia', 'description' : 'Sensor Ultrasonico, indica la distancia conectado al pin 3 y 4.'}
        const sensor3 = new Sensor(newSensor3)
        await sensor3.save()
        const newSensor4 =
            {'user_id':user.id, 'name' : 'LED', 'description' : 'Led RGB para indicar si hay movimiento conectado al pin 5.'}
        const sensor4 = new Sensor(newSensor4)
        await sensor4.save()
        const newSensor5 =
            {'user_id':user.id, 'name' : 'Humumedad', 'description' : 'Sensor que captura la temperatura y el porcentaje de humedad conectado al pin 1.'}
        const sensor5 = new Sensor(newSensor5)
        await sensor5.save()


        const sensors = [sensor,sensor2,sensor3,sensor4,newSensor5]
        return response.status(200).json(sensors)
    }

    async showMySensors({ response, auth }) {
        const user = await auth.getUser()
        const mySensors = await Sensor.find({'user_id':user.id}).lean()
        // console.log(mySensors[0].name)

        // if (mySensors == 0) return response.status(400).json({message:'Sensores no encontrados'})
        return response.status(200).json(mySensors)
    }

    async deleteByUser({ response, auth }) {
        const user = await auth.getUser()
        await Sensor.deleteMany({user_id:user.id})

        return response.json({message: "los sensores del usuario "+user.name+" fueron eliminados"})

    }

    async showSensor({ response, auth, params:{name}}) {
      const user = await auth.getUser()
      const sensor = await Sensor.findOne({user_id:user.id, name:name}).lean()
      return response.status(200).json(sensor)
    }

    async regMonitor({response, auth, data}){
      const user = await auth.getUser()
      const sensore = await Sensor.findOne({name:"Distancia"},{user_id:this.auth.user.id});
      const idsensor = sensore._id
      const Obj = {
        "sensor_id":idsensor,
        "usuario_id":this.auth.user.id,
        "Data":data
      }
      const dato = new Resultado(Obj);
      dato.save();
    }

    async obtenerid({ response, auth }){
        const user = await auth.getUser()
        const humedad = await Sensor.findOne({name:"Humedad"},{user_id:auth.user.id})
        const movimiento = await Sensor.findOne({name:"Movimiento"},{user_id:auth.user.id})
        const temperatura = await Sensor.findOne({name:"Temperatura"},{user_id:auth.user.id})
        const distancia = await Sensor.findOne({name:"Distancia"},{user_id:auth.user.id})
        const idhumedad = humedad._id
        const nombrehumedad = "Humumedad"
        const idmovimiento = movimiento._id
        const nombremovimiento ="Movimiento"
        const idtemperatura = temperatura._id
        const nombretemperatura = "Temperatura"
        const iddistancia = distancia._id
        const nombredistancia = "Distancia"

        return response.json({
          "user_id":auth.user.id,
          "sensor_id_Humumedad":idhumedad,
          "Humumedad":nombrehumedad,
          "sensor_id_Movimiento":idmovimiento,
          "Movimiento":nombremovimiento,
          "sensor_id_Temperatura":idtemperatura,
          "Temperatura":nombretemperatura,
          "sensor_id_Distancia":iddistancia,
          "Distancia":nombredistancia
        });
    }

}

module.exports = SensorController
