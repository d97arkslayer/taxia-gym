'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoachSchema extends Schema {
    up() {
        this.create('coaches', (table) => {
            table.increments()
            table.string('name', 80).notNullable()
            table.string('lastname', 80).notNullable()
            table.string('email', 254).notNullable().unique()
            table.string('password', 60).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('coaches')
    }
}

module.exports = CoachSchema