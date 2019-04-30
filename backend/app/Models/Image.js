'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Image extends Model {
    excercise() {
        return this.belongsTo('App/Models/Excercise')
    }
}

module.exports = Image