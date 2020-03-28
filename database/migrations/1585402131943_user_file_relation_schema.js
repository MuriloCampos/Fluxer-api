'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserFileRelationSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('user_file_relations', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UserFileRelationSchema
