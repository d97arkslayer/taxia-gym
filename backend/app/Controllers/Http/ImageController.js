'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with images
 */
const axios = require('axios')
const Excercise = use('App/Models/Excercise')
const Image = use('App/Models/Image')
class ImageController {
    /**
     * Show a list of all images.
     * GET images
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let images = await Image.all()
        if (images.rows.length < 1) {
            await this.getImages()
            images = await Image.all()
        }
        response.status(200).json(images)

    }
    async getImages() {
        try {
            let apiImages = await axios.get('https://wger.de/api/v2/exerciseimage/')
            let { results, next } = apiImages.data
            const array = []
            while (next !== null) {
                for (const result of results) {
                    const { exercise, image } = result
                    const excercise = await Excercise.find(exercise)
                    if (excercise) {
                        array.push({ excercise_id: exercise, url: image })
                    }
                }
                try {
                    apiImages = await axios.get(next)
                    results = apiImages.data.results
                    next = apiImages.data.next
                } catch (error) {
                    console.log
                }
            }
            await Image.createMany(array)

        } catch (error) {

        }
    }

    /**
     * Render a form to be used for creating a new image.
     * GET images/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new image.
     * POST images
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {}

    /**
     * Display a single image.
     * GET images/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing image.
     * GET images/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update image details.
     * PUT or PATCH images/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a image with id.
     * DELETE images/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = ImageController