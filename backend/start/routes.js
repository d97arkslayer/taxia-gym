'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

//Muscles
Route.get('muscles', 'MuscleController.index')
    //Equipment
Route.get('equipment', 'EquipmentController.index')
    //Coach
Route.post('coach/register', 'CoachController.store')
Route.post('api/v1/coach/login', 'CoachController.login')
Route.group(() => {
        Route.get('coach/:id', 'UserController.show')
    }).prefix('api/v1').middleware('auth:coach')
    //User
Route.post('user/register', 'UserController.store')
Route.post('api/v1/user/login', 'UserController.login')
Route.group(() => {
    Route.get('user/:id', 'UserController.show')
    Route.put('user/:id', 'UserController.update')
    Route.get('equipment', 'EquipmentController.index')
}).prefix('api/v1').middleware('auth')
Route.get('user/test', 'UserController.test')