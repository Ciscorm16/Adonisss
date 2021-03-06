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
                $lookup :{ from: 'sensors', localField: 'sensor', foreignField: '_id', as: 'sensor'}
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
              $lookup :{ from: 'sensors', localField: 'sensor', foreignField: '_id', as: 'sensor'}
          }, {
              $unwind: '$sensor'
          }, {
              $match: { 'sensor.name':'Temperatura' }
          }
      ]).sort({data: -1}).limit(1);
      return response.status(200).json(tempMax[0])
  }

  async tempMin({response, auth}) {
      const user = await auth.getUser()

      // const tempMax = this.temperature(user.id, -1)
      const tempMin = await Result.aggregate([
          {
              $lookup :{ from: 'sensors', localField: 'sensor', foreignField: '_id', as: 'sensor'}
          }, {
              $unwind: '$sensor'
          }, {
              $match: { 'sensor.name':'Temperatura' }
          }
      ]).sort({data: 1}).limit(1);
      return response.status(200).json(tempMin[0])
  }

  async humMax({response, auth}) {
      const user = await auth.getUser()

      // const tempMax = this.temperature(user.id, -1)
      const tempMax = await Result.aggregate([
          {
              $lookup :{ from: 'sensors', localField: 'sensor', foreignField: '_id', as: 'sensor'}
          }, {
              $unwind: '$sensor'
          }, {
              $match: { 'sensor.name':'Humedad' }
          }
      ]).sort({data: -1}).limit(1);
      return response.status(200).json(tempMax[0])
  }

  async humMin({response, auth}) {
      const user = await auth.getUser()

      // const tempMax = this.temperature(user.id, -1)
      const tempMin = await Result.aggregate([
          {
              $lookup :{ from: 'sensors', localField: 'sensor', foreignField: '_id', as: 'sensor'}
          }, {
              $unwind: '$sensor'
          }, {
              $match: { 'sensor.name':'Humedad' }
          }
      ]).sort({data: 1}).limit(1);
      return response.status(200).json(tempMin[0])
  }

    async presenceCounter({response, auth}) {
        const user = await auth.getUser()

        // const tempMax = this.temperature(user.id, -1)
        const counter = await Result.aggregate([
            {
                $lookup :{ from:'sensors', localField:'sensor', foreignField:'_id', as:'sensor'}
            }, {
                $unwind: '$sensor' 
            }, {
                $match: { 'sensor.name':'Movimiento', 'data':true }
            }, {
                $count: 'presencias'
            }
        ]);
        const counterString = counter[0]["presencias"].toString()
        console.log(counterString);
        return response.status(200).json({data:counterString, message:"contador de presencias"})
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
