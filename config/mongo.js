
const Env = use('Env')

module.exports = {
  host: Env.get('MONGO_HOST', ''),
  port: Env.get('MONGO_PORT', ''),
  user: Env.get('MONGO_USER', ''),
  pass: Env.get('MONGO_PASS', ''),
  db: Env.get('MONGO_DATABASE', '')
}

/*
const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/seguridapp'

// mongoose.openUri(uri)
mongoose.connect(uri,{ useMongoClient: true })
// mongoose.Promise = global.Promise
mongoose.connection.on('open', _ => {
  console.log('conectado a MongoDB en:',uri)
})
*/

/*
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/seguridapp'

// mongoose.openUri(uri)
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.Promise = global.Promise
*/
