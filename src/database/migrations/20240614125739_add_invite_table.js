/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('invites', table => {
    table.bigIncrements('id').primary();
    table.bigint('user_id');
    table.foreign('user_id').references('users.id');
    table.string('hash', 255).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('invites');
};
