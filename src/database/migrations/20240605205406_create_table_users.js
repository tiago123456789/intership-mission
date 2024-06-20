/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("companies", (table) => {
      table.bigIncrements("id").primary();
      table.string("name", 50).notNullable();
    })

    .createTable("roles", (table) => {
      table.bigIncrements("id").primary();
      table.string("name", 50).notNullable();
    })

    .createTable("users", (table) => {
      table.bigIncrements("id").primary();
      table.string("email", 120).notNullable();
      table.string("password", 255).notNullable();
      table.string("name", 70).notNullable();
      table.bigInteger("company_id").notNullable();
      table.foreign("company_id").references("companies.id");
      table.bigInteger("role_id").notNullable();
      table.foreign("role_id").references("roles.id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("companies")
    .dropTable("roles");
};
