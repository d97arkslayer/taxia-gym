'use strict'

const Factory = use('Factory')
const { test, before, trait } = use('Test/Suite')('Register user')
const User = use('App/Models/User')

trait('Auth/Client')
trait('Test/ApiClient')
trait('DatabaseTransactions')
trait('Session/Client')

test('Register user', async({ assert, client, auth }) => {
    await Factory.model('App/Models/User').create()
    const response = await client.get('/users').end()
    response.assertStatus(200)
    assert.isTrue(response.body.length > 0)
})