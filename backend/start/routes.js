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


Route.group(() => {
    Route.get('*', 'WebviewController.index')
}).prefix('webview')

// Images
Route.get('images', 'ImageController.index')
    //Excercises
Route.get('excercises', 'ExcerciseController.index')
Route.get('excercises/test', 'ExcerciseController.excerciseWithOutMuscle')
Route.get('excercises/images', 'ExcerciseController.excerciseWithImages')
Route.get('excercises/secondary', 'ExcerciseController.secondaryMuscles')
Route.get('excercises/rutine/:id', 'ExcerciseController.rutine')
Route.get('users', 'UserController.index')
    //Muscles
Route.get('muscles', 'MuscleController.index')
Route.get('muscles/rutine', 'MuscleController.rutine')

//Ingredients
Route.get('ingredients', 'IngredientController.index')
    //Equipment
Route.get('equipment', 'EquipmentController.index')
    //Coach
Route.post('coach/register', 'CoachController.store')
Route.post('api/v1/coach/login', 'CoachController.login')
Route.group(() => {
        Route.get('coach/:id', 'UserController.show')
    }).prefix('api/v1').middleware('auth:coach')
    //User
    //Registrar Usuario
Route.post('user/register', 'UserController.store')
    //Loguear un usuarii
Route.post('api/v1/user/login', 'UserController.login')
Route.group(() => {
    Route.get('user/:id', 'UserController.show')
    Route.put('user/:id', 'UserController.update')
    Route.get('equipment', 'EquipmentController.index')
    Route.get('muscles', 'MuscleController.index')
    Route.get('excercises/withoutmuscle', 'ExcerciseController.excerciseWithOutMuscle')
    Route.get('excercises/secondary', 'ExcerciseController.secondaryMuscles')
    Route.get('excercises/rutine/:id', 'ExcerciseController.rutine')
    Route.get('muscles/rutine', 'MuscleController.rutine')
    Route.get('ingredients', 'IngredientController.index')
}).prefix('api/v1').middleware('auth')