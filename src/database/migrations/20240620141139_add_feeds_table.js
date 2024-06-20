const { table } = require("..");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("feeds", (table) => {
    table.bigIncrements("id").primary();
    table.string("title", 50).notNullable();
    table.string("image", 255).notNullable();
    table.text("content");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.boolean("is_pendent").defaultTo(true);
    table.bigInteger("user_id");
    table.foreign("user_id").references("users.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
