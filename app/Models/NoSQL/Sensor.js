'use strict'
/*
const mongoose = use('Mongoose')
const autoIncrement = require('mongoose-auto-increment')
const mongooseLeanGetters = require('mongoose-lean-getters');
const mongooseAutoPopulate = require('mongoose-autopopulate')

const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed

var connection = mongoose.createConnection('mongodb://127.0.0.1:27017/seguridapp');
autoIncrement.initialize(connection);

let sensorSchema = mongoose.Schema({
  user_id: { type: Number, default: '', requiered: true },
  name: { type: String, default: '', requiered: true },
  description: { type: String, default: '', requiered: true }
},{
  timestamps: true
})

// falta hacer unique pero con user|id && user|name && user|pin
sensorSchema.set('autoIndex', false)
sensorSchema.index({ name:1 , user_id:1 }, {unique: true})

sensorSchema.plugin(mongooseLeanGetters, mongooseAutoPopulate)

module.exports = mongoose.model('sensors', sensorSchema)
*/

const mongoose = use('Mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const Mixed = mongoose.Schema.Types.Mixed


let sensorSchema = mongoose.Schema({
  user_id: { type: Number, default: '', requiered: true },
  name: { type: String, default: '', requiered: true },
  description: { type: String, default: '', requiered: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('Sensors', sensorSchema)
