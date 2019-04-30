'use strict'

//const Factory = use('Factory')
const { test, trait } = use('Test/Suite')('Excercise without muscle Get')

trait('Test/ApiClient')
trait('DatabaseTransactions')


test("You don´t have permissions", async({ assert, client }) => {
    const response = await client.get('/api/v1/excercises/withoutmuscle').end()
    response.assertStatus(401)
})