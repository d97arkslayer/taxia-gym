'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExcerciseMuscleSchema extends Schema {
    up() {
        this.create('excercise_muscles', (table) => {
            table.increments()
            table.integer('muscle_id').unsigned().references('id').inTable('muscles').onDelete('cascade')
            table.integer('excercise_id').unsigned().references('id').inTable('excercises').onDelete('cascade')
            table.boolean('secondary').defaultTo(false)
            table.timestamps()
        })
    }

    down() {
        this.drop('excercise_muscles')
    }
}

module.exports = ExcerciseMuscleSchema