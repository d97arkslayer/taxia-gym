'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers')
    /**
     * Resourceful controller for interacting with webviews
     */
class WebviewController {
    /**
     * Show a list of all webviews.
     * GET webviews
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        response.download(Helpers.publicPath('index.html'))
    }
}

module.exports = WebviewController