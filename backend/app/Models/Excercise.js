'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Excercise extends Model {
    excerciseMuscles() {
        return this.hasMany('App/Models/ExcerciseMuscle')
    }

    images() {
        return this.hasMany('App/Models/Image')
    }
}

module.exports = Excercise