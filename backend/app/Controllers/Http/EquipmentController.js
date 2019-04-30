'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with equipment
 */
const Equipment = use('App/Models/Equipment')
const axios = require('axios')
class EquipmentController {
    /**
     * Show a list of all equipment.
     * GET equipment
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    //Valida si hay equipos sino hay se consume la api y se llena 
    async index({ request, response, view }) {
            let equipments = await Equipment.all()
            if (equipments.rows.length < 1) {
                await this.createData()
            }
            equipments = await Equipment.all()
            response.status(200).json(equipments)
        }
        //Va a la api de equipos los recorre y los guarda en base de datos
    async createData() {
            try {
                const apiEquipments = await axios.get('https://wger.de/api/v2/equipment/')
                const { results } = apiEquipments.data
                let array = []
                for (let item of results) {
                    let url = await this.photosUnplash(item)
                    array.push({ id: item.id, name: item.name, url_image: url })
                }
                await Equipment.createMany(array)
            } catch (error) {
                console.log(error)
            }
        }
        //Trae los equipos y les asigna una imagen aleatoria de unplash buscada con el nombre de la maquina
    async photosUnplash(item) {
        return await axios.get('https://api.unsplash.com/search/photos?client_id=a3a865051f02bb99d25614343694acd730df8bdae7be2b6834d1dac701dfcc85&page=1&query=' + item.name)
            .then(async(response) => {
                const item = response.data.results.find((item) => {
                    return item.links.download_location
                })
                const { download_location } = item.links
                const url = await axios.get(`${download_location}?client_id=a3a865051f02bb99d25614343694acd730df8bdae7be2b6834d1dac701dfcc85`)
                    .then(response => response.data.url)
                    .catch(error => 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/450px-Imagen_no_disponible.svg.png')
                return url

            })
            .catch(error => {
                console.log(error)
            })
    }

    /**
     * Render a form to be used for creating a new equipment.
     * GET equipment/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new equipment.
     * POST equipment
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {}

    /**
     * Display a single equipment.
     * GET equipment/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing equipment.
     * GET equipment/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update equipment details.
     * PUT or PATCH equipment/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a equipment with id.
     * DELETE equipment/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}
}

module.exports = EquipmentController