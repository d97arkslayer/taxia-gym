'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class IngredientSchema extends Schema {
    up() {
        this.create('ingredients', (table) => {
            table.integer('id').unsigned().notNullable().primary()
            table.string('name')
            table.integer('energy')
            table.float('grams')
            table.timestamps()
        })
    }

    down() {
        this.drop('ingredients')
    }
}

module.exports = IngredientSchema