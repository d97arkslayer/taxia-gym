'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipmentSchema extends Schema {
    up() {
        this.create('equipment', (table) => {
            table.integer('id').notNullable()
            table.primary('id')
            table.string('name').notNullable()
            table.string('url_image')
            table.timestamps()
        })
    }

    down() {
        this.drop('equipment')
    }
}

module.exports = EquipmentSchema