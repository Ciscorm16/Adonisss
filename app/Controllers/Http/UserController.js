'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')
const Sensor = use('App/Models/NoSQL/Sensor')

class UserController {
    async store({request, response}) {

        const userData = request.all()
        const user = await User.create(userData)
            // console.log(user);
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

        const sensors = [sensor,sensor2,sensor3,sensor4,sensor5]
        // console.log(sensors);
        return response.json({
          status: "Se creo Correctamente"
        });
        /*
        return response.created({
            status: true,
            data: user,
        })
        */
    }

    async show({response, auth}) {
        const session = await auth.getUser()
        const user = await User.findBy('id',session.id)
        return response.status(200).json(user)
    }

    async update({request, response, auth}){
        const session = await auth.getUser()

        const name = request.input('name')
        const last_name = request.input('last_name')
        const cel = request.input('cel')
        const age = request.input('age')
        const email = request.input('email')
        // const password = request.input('password')

        const user = await User.find(session.id)

        user.name = name
        user.last_name = last_name
        user.cel = cel
        user.age = age
        user.email = email
        // user.password = password

        await user.save()

        return response.status(200).json(user)
    }

    async destroy({auth, response}){
        const user = await auth.getUser()

        await user.delete()
        return response.status(200).json({message:'Usuario eliminado'})
    }
}

module.exports = UserController
