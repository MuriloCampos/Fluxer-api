'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')

Route.post('sessions', 'SessionController.store')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.get('users/:id', 'UserController.show')
  Route.put('users/:id', 'UserController.update')
  Route.post('files', 'FileController.store')
  Route.resource('books', 'BookController').apiOnly()
  Route.resource('classes', 'ClassController').apiOnly()
}).middleware(['auth'])
