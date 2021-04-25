'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel("humedad","HumedadController").middleware(['auth']);
Ws.channel("temperatura","TemperaturaController").middleware(['auth']);
Ws.channel("ultrasonico","UltrasonicoController").middleware(['auth']);
Ws.channel("pir","PirController").middleware(['auth']);
