'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookRelationSchema extends Schema {
  up () {
    this.alter('classes', (table) => {
      table
        .integer('book_id')
        .unsigned()
        .references('id')
        .inTable('books')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('book_relations', (table) => {
      // reverse alternations
    })
  }
}

module.exports = BookRelationSchema
