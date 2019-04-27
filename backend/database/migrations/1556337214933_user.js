'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments()
            table.string('name', 80).notNullable()
            table.string('lastname', 80).notNullable()
            table.string('email', 254).notNullable().unique()
            table.string('password', 60).notNullable()
            table.float('weight').notNullable()
            table.float('height').notNullable()
            table.string('profession').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema