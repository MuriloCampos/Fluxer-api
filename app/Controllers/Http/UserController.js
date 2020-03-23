'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password', 'file_id'])

    const user = await User.create(data)

    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.load('classes')
    await user.load('file')

    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['username', 'email', 'password', 'file_id'])

    user.merge(data)

    await user.save()

    return user
  }
}

module.exports = UserController
