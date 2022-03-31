exports.up = function (knex) {
  return knex.schema.createTable('votes', function (table) {
    table.increments()
    table.integer('user').unsigned()
    table.integer('candidate').unsigned()
    table.timestamps(true, true)

    table.foreign('user').references('id').inTable('users')
    table.foreign('candidate').references('id').inTable('candidates')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('votes')
}
