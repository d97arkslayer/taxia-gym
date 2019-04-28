'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with muscles
 */
const Muscle = use('App/Models/Muscle')
const axios = require('axios')
class MuscleController {
    /**
     * Show a list of all muscles.
     * GET muscles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let muscles = await Muscle.all()
        if (muscles.rows.length < 1) {
            await this.createMuscles()
        }
        muscles = await Muscle.all()
        response.status(200).json(muscles)
    }

    async createMuscles() {
        try {
            const petition = await axios.get('https://wger.de/api/v2/muscle/')
            const muscles = petition.data.results
            const array = []
            for (const muscle of muscles) {
                const { id, name } = muscle
                array.push({ id, name })
            }
            await Muscle.createMany(array)
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Render a form to be used for creating a new muscle.
     * GET muscles/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new muscle.
     * POST muscles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {}

    /**
     * Display a single muscle.
     * GET muscles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing muscle.
     * GET muscles/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update muscle details.
     * PUT or PATCH muscles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a muscle with id.
     * DELETE muscles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = MuscleController