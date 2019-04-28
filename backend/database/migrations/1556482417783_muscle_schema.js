'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MuscleSchema extends Schema {
    up() {
        this.create('muscles', (table) => {
            table.integer('id')
            table.primary('id')
            table.string('name')
            table.timestamps()
        })
    }

    down() {
        this.drop('muscles')
    }
}

module.exports = MuscleSchema