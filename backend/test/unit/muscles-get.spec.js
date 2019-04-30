'use strict'

//const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Muscles Get')

trait('Test/ApiClient')
trait('DatabaseTransactions')


test("You don´t have permissions", async({ assert, client }) => {
    const response = await client.get('/api/v1/muscles').end()
    response.assertStatus(401)
})