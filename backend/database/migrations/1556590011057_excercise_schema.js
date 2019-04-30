'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExcerciseSchema extends Schema {
    up() {
        this.create('excercises', (table) => {
            table.integer('id').unsigned().notNullable().primary()
            table.string('name')
            table.string('name_original')
            table.string('description', 10000)
            table.string('language')
            table.timestamps()
        })
    }

    down() {
        this.drop('excercises')
    }
}

module.exports = ExcerciseSchema