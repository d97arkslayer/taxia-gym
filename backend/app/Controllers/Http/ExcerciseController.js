'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with excercises
 */
const axios = require('axios')
const Excercise = use('App/Models/Excercise')
const ExcerciseMuscle = use('App/Models/ExcerciseMuscle')
const Muscle = use('App/Models/Muscle')
class ExcerciseController {
    /**
     * Show a list of all excercises.
     * GET excercises
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let excercises = await Excercise.all()
        if (excercises.rows.length < 1) {
            await this.createData()
            await this.getImages()
            excercises = await Excercise.all()
        }
        response.status(200).json(excercises)
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

    async createData() {
        try {
            let apiExcercises = await axios.get('https://wger.de/api/v2/exercise/')
            let { results, next } = apiExcercises.data
            while (next !== null) {
                for (const result of results) {
                    const { id, name, name_original, description, language } = result
                    if (language === 2 || language === 4 || language === 7) {
                        await Excercise.create({ id, name, name_original, language })
                        if (result.muscles.length > 0) {
                            for (const muscle of result.muscles) {
                                await ExcerciseMuscle.create({ muscle_id: muscle, excercise_id: id, secondary: false })
                            }
                        }
                        if (result.muscles_secondary.length > 0) {
                            for (const secondary of result.muscles_secondary) {
                                await ExcerciseMuscle.create({ muscle_id: secondary, excercise_id: id, secondary: true })
                            }
                        }
                    }
                }
                try {
                    apiExcercises = await axios.get(next)
                    results = apiExcercises.data.results
                    next = apiExcercises.data.next
                } catch (error) {
                    console.log
                }
            }

        } catch (error) {
            console.log(error)
        }
    }


    async rutine({ params, response, request }) {
        const excercisesAll = await Excercise.query().with('excerciseMuscles').fetch()
        const excercises = excercisesAll.toJSON().filter((excercise) => {
            const id = params.id
            const r = this.isForMuscle(excercise.excerciseMuscles, id)
            return r
        })
        response.status(200).json(excercises)
    }
    isForMuscle(muscles, id) {
        for (const muscle of muscles) {
            if (muscle.muscle_id === Number.parseInt(id) && muscle.secondary === 0) {
                return muscle
            }
        }
        return false
    }



    /**
     * Render a form to be used for creating a new excercise.
     * GET excercises/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {}

    /**
     * Create/save a new excercise.
     * POST excercises
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {}

    /**
     * Display a single excercise.
     * GET excercises/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {}

    /**
     * Render a form to update an existing excercise.
     * GET excercises/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {}

    /**
     * Update excercise details.
     * PUT or PATCH excercises/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {}

    /**
     * Delete a excercise with id.
     * DELETE excercises/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {}

    async excerciseWithOutMuscle({ params, request, response }) {
        const excercises = await Excercise.query().with('excerciseMuscles').with('images').fetch()
        const rows = excercises.toJSON()
        const excerciseWithOutMuscle = rows.filter((row) => {
            return row.excerciseMuscles.length < 1
        })

        response.status(200).json(excerciseWithOutMuscle)
    }

    async excerciseWithImages({ params, request, response }) {
        const excercises = await Excercise.query().with('images').fetch()
        response.status(200).json(excercises)
    }

    async secondaryMuscles({ params, request, response }) {
        const excercises = await Excercise.query().with('excerciseMuscles').with('images').fetch()
        const secondary = excercises.toJSON().filter((excercise) => {
            const r = this.hasSecondary(excercise.excerciseMuscles)
            return r
        })

        for (const second of secondary) {
            second.secondaries = []
            for (const muscle of second.excerciseMuscles) {
                if (muscle.secondary === 1) {
                    let muscleO = await Muscle.find(muscle.muscle_id)
                    muscleO = muscleO.toJSON()
                    second.secondaries.push(muscleO.name)
                }
            }
        }

        response.status(200).json(secondary)
    }

    hasSecondary(muscles) {
        for (const muscle of muscles) {
            if (muscle.secondary === 1) {
                return muscle
            }
        }
        return false
    }

}

module.exports = ExcerciseController