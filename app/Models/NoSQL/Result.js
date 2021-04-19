/*
'use strict'

const mongoose = use('Mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongooseLeanGetters = require('mongoose-lean-getters');
const mongooseAutoPopulate = require('mongoose-autopopulate')

const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed

var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/seguridapp');
autoIncrement.initialize(connection);

let resultSchema = mongoose.Schema({
  sensor: { type: ObjectId, ref:'Sensor', autopopulate: true },
  data: { type: Mixed, default: '', requiered: true},
  usuario_id:{type:String,default:''}
},{
  timestamps: true
})

resultSchema.plugin(mongooseLeanGetters,mongooseAutoPopulate)

module.exports = mongoose.model('Result', resultSchema)
*/

'use strict'

const mongoose = use('Mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed
const Sensor = use('App/Models/NoSQL/Sensor');

let ResultadoSchema = mongoose.Schema({
  sensor_id: {type: Mixed, default: '' },
  usuario_id:{ type: Number, default: '' },
  Data: { type: Mixed, default: '' },
}, {
  timestamps: true
})

module.exports = mongoose.model('Resultado', ResultadoSchema)
