'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with ingredients
 */
const axios = require('axios')
const Ingredient = use('App/Models/Ingredient')
class IngredientController {
    /**
     * Show a list of all ingredients.
     * GET ingredients
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    //Se valida si existen registros en la base de datos, sino se proceder a consumir la api y a llenar la base de datos
    async index({ request, response, view }) {
            let ingredients = await Ingredient.all()
            if (ingredients.rows.length < 1) {
                await this.createData()
                ingredients = await Ingredient.all()
            }
            response.status(200).json(ingredients)
        }
        //Hace la petición a la api recorre los resultados y los almacena en base de datos
    async createData() {
        try {
            let ingredients = await axios.get('https://wger.de/api/v2/ingredient?limit=2000&ordering=id,energy')
            let { results } = ingredients.data
            const array = {}
                //results.filter(item => item.energy < 301).map(item => array[item.id] = { id: item.id, name: item.name, energy: item.energy, grams: 1 })
            results.filter(item => item.energy < 301).map(({ id, name, energy }) => array[id] = ({ id, name, energy, grams: 1 }))
            let weights = await axios.get('https://wger.de/api/v2/ingredientweightunit?limit=2000&ordering=ingredient&unit=1')
            let res = weights.data.results
            for (const result of res) {
                if (array.hasOwnProperty(result.ingredient)) {
                    array[result.ingredient].grams = result.gram
                }
            }
            ingredients = Object.values(array)
            await Ingredient.createMany(ingredients)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Render a form to be used for creating a new ingredient.
     * GET ingredients/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new ingredient.
     * POST ingredients
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {}

    /**
     * Display a single ingredient.
     * GET ingredients/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing ingredient.
     * GET ingredients/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update ingredient details.
     * PUT or PATCH ingredients/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a ingredient with id.
     * DELETE ingredients/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = IngredientController