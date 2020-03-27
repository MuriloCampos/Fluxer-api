'use strict'

const Class = use('App/Models/Class')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with classes
 */
class ClassController {
  /**
   * Show a list of all classes.
   * GET classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const user_id = request.header('user_id')
    const classes = await Class.query().where('user_id', user_id).with('book').fetch()

    return classes
  }

  /**
   * Create/save a new class.
   * POST classes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const data = request.only(['book_id', 'group', 'time'])

    const newClass = Class.create({ ...data, user_id: auth.user.id })

    return newClass
  }

  /**
   * Display a single class.
   * GET classes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const selectedClass = await Class.findOrFail(params.id)

    await selectedClass.load('user')
    await selectedClass.load('book')

    return selectedClass
  }

  /**
   * Update class details.
   * PUT or PATCH classes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const selectedClass = await Class.findOrFail(params.id)
    const data = request.only(['book_id', 'group', 'time'])

    selectedClass.merge(data)

    await selectedClass.save()

    return selectedClass
  }

  /**
   * Delete a class with id.
   * DELETE classes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const selectedClass = await Class.findOrFail(params.id)

    selectedClass.delete()
  }
}

module.exports = ClassController
