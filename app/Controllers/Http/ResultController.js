'use strict'

const Sensor = use('App/Models/NoSQL/Sensor')
const Result = use('App/Models/NoSQL/Result')

class ResultController {
    async store({request, response}) {
        const {sensor, data} = request.all()

        const newResult = {sensor, data}
        const result = new Result(newResult)
        await result.save()
        return response.status(201).json(result)
    }

    async showData({response, auth}) {
        const user = await auth.getUser()

        const myDataSensors = await Result.aggregate([
            {
                $lookup :{ from: 'sensors', localField: 'sensors', foreignField: '_id', as: 'sensors'}
            }, {
                $unwind: '$sensors'
            }, {
                $match: { 'sensors.user_id': user.id }
            }
        ]);

        return response.status(200).json(myDataSensors)
    }

    async tempMax({response, auth}) {
      const user = await auth.getUser()

      // const tempMax = this.temperature(user.id, -1)
      const tempMax = await Result.aggregate([
          {
              $lookup :{ from: 'sensors', localField: 'sensors', foreignField: '_id', as: 'sensors'}
          }, {
              $unwind: '$sensors'
          }, {
              $match: { 'sensors.user_id': user.id, 'sensors.name':'Temperatura' }
          }
      ]).sort({data: -1}).limit(1);
      return response.status(200).json(tempMax)
  }

  async tempMin({response, auth}) {
      const user = await auth.getUser()

      // const tempMax = this.temperature(user.id, -1)
      const tempMin = await Result.aggregate([
          {
              $lookup :{ from: 'sensors', localField: 'sensors', foreignField: '_id', as: 'sensors'}
          }, {
              $unwind: '$sensors'
          }, {
              $match: { 'sensors.user_id': user.id, 'sensors.name':'Temperatura' }
          }
      ]).sort({data: 1}).limit(1);
      return response.status(200).json(tempMin)
  }

  async humMax({response, auth}) {
      const user = await auth.getUser()

      // const tempMax = this.temperature(user.id, -1)
      const humMax = await Result.aggregate([
          {
              $lookup :{ from: 'sensors', localField: 'sensors', foreignField: '_id', as: 'sensors'}
          }, {
              $unwind: '$sensors'
          }, {
              $match: { 'sensors.user_id': user.id, 'sensors.name':'Humedad' }
          }
      ]).sort({data: -1}).limit(1);
      return response.status(200).json(humMax)
  }

  async humMin({response, auth}) {
      const user = await auth.getUser()

      // const tempMax = this.temperature(user.id, -1)
      const humMin = await Result.aggregate([
          {
              $lookup :{ from: 'sensors', localField: 'sensors', foreignField: '_id', as: 'sensors'}
          }, {
              $unwind: '$sensors'
          }, {
              $match: { 'sensors.user_id': user.id, 'sensors.name':'Humedad' }
          }
      ]).sort({data: 1}).limit(1);
      return response.status(200).json(humMin)
  }

    async presenceCounter({response, auth}) {
        const user = await auth.getUser()

        // const tempMax = this.temperature(user.id, -1)
        const counter = await Result.aggregate([
            {
                $lookup :{ from:'sensors', localField:'sensors', foreignField:'_id', as:'sensors'}
            }, {
                $unwind: '$sensors'
            }, {
                $match: { 'sensors.user_id':user.id, 'sensors.name':'Movimiento', 'data':true }
            }, {
                $count: 'presencias'
            }
        ]);
        return response.status(200).json(counter)
    }

    async deleteByUser({response, auth}) {
      const user = await auth.getUser()
      const sensor1 = await Sensor.findOne({user_id:user.id, name:'Temperatura'})
      console.log(sensor1._id);
      await Result.deleteMany({sensor:sensor1._id})
      const sensor2 = await Sensor.findOne({user_id:user.id, name:'Movimiento'})
      console.log(sensor2._id);
      await Result.deleteMany({sensor:sensor2._id})
      const sensor3 = await Sensor.findOne({user_id:user.id, name:'Distancia'})
      console.log(sensor3._id);
      await Result.deleteMany({sensor:sensor3._id})
      const sensor4 = await Sensor.findOne({user_id:user.id, name:'Humedad'})
      console.log(sensor4._id);
      await Result.deleteMany({sensor:sensor4._id})
      return response.status(200).json({message:'Hisrotial Vaciado'})
  }
}

module.exports = ResultController
