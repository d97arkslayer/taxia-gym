'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
    return {
        name: faker.username(),
        lastname: faker.last(),
        email: faker.email(),
        password: faker.password(),
        weight: faker.floating({ min: 20, max: 100 }),
        height: faker.floating({ min: 1, max: 2 }),
        imc: faker.floating({ min: 18, max: 28 }),
        profession: faker.profession()
    }
})