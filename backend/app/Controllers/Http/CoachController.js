'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with coaches
 */

const Coach = use('App/Models/Coach')
class CoachController {
    /**
     * Show a list of all coaches.
     * GET coaches
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {}

    /**
     * Render a form to be used for creating a new coach.
     * GET coaches/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new coach.
     * POST coaches
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response, auth }) {
        const { email, password, name, lastname } = request.post()
        const coach = await Coach.create({ email, password, name, lastname })
        let token = await auth.generate(coach)
        response.status(201).json({ coach, token })
    }

    /**
     * Display a single coach.
     * GET coaches/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        const coach = await Coach.find(params.id)
        if (!coach) {
            return response.status(404)
        }
        response.status(200).json(coach)
    }

    /**
     * Render a form to update an existing coach.
     * GET coaches/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update coach details.
     * PUT or PATCH coaches/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        const { name, lastname, password } = request.post()
        const coach = await Coach.find(params.id)
        if (!coach) {
            return response.status(404)
        }
        coach.name = name || coach.admin
        coach.lastname = lastname || coach.lastname
        coach.password = password || coach.password
        await coach.save()
        response.status(201).json(coach)
    }

    /**
     * Delete a coach with id.
     * DELETE coaches/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        const coach = await Coach.find(params.id)
        if (!coach) {
            return response.status(404)
        }
        await coach.delete()
        response.status(201)
    }

    async login({ auth, request, response }) {
        const { email, password } = request.all()
        const token = await auth.authenticator('coach').withRefreshToken().attempt(email, password)
        response.status(200).json(token)
    }
}

module.exports = CoachController