'use strict'

//const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Ingredients Get')

trait('Test/ApiClient')
trait('DatabaseTransactions')


test("You don´t have permissions", async({ assert, client }) => {
    const response = await client.get('/api/v1/ingredients').end()
    response.assertStatus(401)
})