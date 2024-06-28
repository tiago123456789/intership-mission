const bcrypt = require('bcryptjs');


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id: 1, name: 'ADMIN'},
    {id: 2, name: 'MEMBER'}
  ])

  await knex('companies').del()
  await knex('companies').insert([
    {id: 1, name: "Mission Brasil"}
  ])

  const passwordHash = bcrypt.hashSync("teste123", 8)

  await knex('users').del()
  await knex('users').insert([
    {email: 'root@root.com', password: passwordHash, name: 'User 1', role_id: 1, company_id: 1},
    {email: 'user@user.com', password: passwordHash, name: 'User 2', role_id: 2, company_id: 1}
  ]);
};
