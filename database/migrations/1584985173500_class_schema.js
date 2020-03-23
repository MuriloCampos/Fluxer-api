'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClassSchema extends Schema {
  up () {
    this.create('classes', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('group').notNullable()
      table.string('time').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('classes')
  }
}

module.exports = ClassSchema
