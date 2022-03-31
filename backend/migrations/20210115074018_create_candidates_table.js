exports.up = function (knex) {
  return knex.schema.createTable('candidates', function (table) {
    table.increments()
    table.string('name_of_chairman')
    table.string('name_of_vice_chairman')
    table.date('birthday_of_chairman')
    table.date('birthday_of_vice_chairman')
    table.string('address_of_chairman')
    table.string('address_of_vice_chairman')
    table.text('description')
    table.integer('total_suara').defaultTo(0)
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('candidates')
}
