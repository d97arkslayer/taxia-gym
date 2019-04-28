'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CoachTokenSchema extends Schema {
    up() {
        this.create('coach_tokens', (table) => {
            table.increments()
            table.integer('coach_id').unsigned().references('id').inTable('coaches')
            table.string('token', 255).notNullable().unique()
            table.string('type', 80).notNullable()
            table.boolean('is_revoked').defaultTo(false)
            table.timestamps()
        })
    }

    down() {
        this.drop('coach_tokens')
    }
}

module.exports = CoachTokenSchema