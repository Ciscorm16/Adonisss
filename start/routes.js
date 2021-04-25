'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'lalalalal' }
})

Route.post('api/register', 'UserController.store')
Route.post('api/login', 'Auth/AuthController.login')

Route.group(() => {
  Route.get('/api/profile', 'UserController.show'),
  Route.put('/api/user', 'UserController.update'),
  Route.delete('/api/user', 'UserController.destroy')
 }).middleware(['auth'])

 //SENSORS
 Route.group(() => {
  Route.post('/api/sensor/registro', 'SensorController.regMonitor')

  Route.post('/api/sensor', 'SensorController.store')
  Route.get('/api/sensor', 'SensorController.showMySensors')
  Route.delete('/api/sensor', 'SensorController.deleteByUser')
}).middleware(['auth'])

//RESULTS
Route.group(() => {
  Route.post('/api/result', 'ResultController.store')
  Route.get('/api/result', 'ResultController.showData')
  Route.get('/api/result/tempMax', 'ResultController.tempMax')
  Route.get('/api/result/tempMin', 'ResultController.tempMin')
  Route.get('/api/result/presenceCounter', 'ResultController.presenceCounter')
}).middleware(['auth'])
