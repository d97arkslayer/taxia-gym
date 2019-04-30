'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ExcerciseMuscle extends Model {
    excercise() {
        return this.belongsTo('App/Models/Excercise')
    }
    muscle() {
        return this.belongsTo('App/Models/Muscle')
    }
}

module.exports = ExcerciseMuscle