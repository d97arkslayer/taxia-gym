'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */
const axios = require('axios')
const User = use('App/Models/User')
const Weight = use('App/Models/Weight')
class UserController {
    /**
     * Show a list of all users.
     * GET users
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {}

    /**
     * Render a form to be used for creating a new user.
     * GET users/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new user.
     * POST users
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response, auth }) {
        const { name, lastname, email, password, weight, height, profession } = request.all()
        let imc = await this.calculateIMC(weight, height);
        const user = await User.create({ name, lastname, email, password, weight, height, profession, imc: imc })
        const weightO = await Weight.create({ user_id: user.id, weight })
        let token = await auth.generate(user)
        response.status(201).json({ user, weightO, token })
    }

    /**
     * Display a single user.
     * GET users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        const user = await User.find(params.id)
        if (user) {
            return response.status(200).json(user)
        }
        response.status(404)
    }

    /**
     * Render a form to update an existing user.
     * GET users/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update user details.
     * PUT or PATCH users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        const { name, lastname, password, weight, height, profession } = request.post()
        const user = await User.find(params.id)
        if (!user) {
            return response.status(404)
        }
        user.name = name || user.name
        user.lastname = lastname || user.lastname
        user.password = password || user.password
        user.weight = weight || user.weight
        user.height = height || user.height
        user.profession = profession || user.profession
        if (weight) {
            user.imc = await this.calculateIMC(user.weight, user.height)
            const weightO = await Weight.create({ user_id: user.id, weight })
        }
        await user.save()
        response.status(201).json(user)
    }

    /**
     * Delete a user with id.
     * DELETE users/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        const user = await User.find(params.id)
        if (!user) {
            return response.status(404)
        }
        await user.delete()
        response.status(201)
    }

    async login({ auth, request, response }) {
        const { email, password } = request.all()
        const token = await auth.withRefreshToken().attempt(email, password)
        response.status(200).json(token)
    }

    async test({ request, response }) {
        const muscles = await axios.get('https://wger.de/api/v2/muscle/')
            .then(response => response.data)
            .catch(error => {
                console.log(error);
            });

        console.log(muscles)

    }

    async calculateIMC(weight, height) {
        return (weight / (height * height)).toFixed(2)
    }
}

module.exports = UserController