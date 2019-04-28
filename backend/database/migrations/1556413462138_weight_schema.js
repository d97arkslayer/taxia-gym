'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WeightSchema extends Schema {
    up() {
        this.create('weights', (table) => {
            table.increments()
            table.integer('user_id').unsigned().notNullable()
            table.float('weight').notNullable()
            table.timestamps()

            table.foreign('user_id').references('users.id').onDelete('CASCADE')
        })
    }

    down() {
        this.drop('weights')
    }
}

module.exports = WeightSchema