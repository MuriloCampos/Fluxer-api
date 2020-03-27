'use strict'

const History = use('App/Models/History')

class HistoryController {
  async index ({ request }) {
    const user_id = request.header('user_id')
    const classes = await History.query().where('teacher_id', user_id).fetch()

    return classes
  }

  async store ({ request, auth }) {
    const data = request.only(['book', 'time', 'class_date'])

    const newClass = History.create({ ...data, teacher_id: auth.user.id })

    return newClass
  }
}

module.exports = HistoryController
