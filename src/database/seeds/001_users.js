/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {email: 'user1@test.com', password: 'test123', name: 'User 1'},
    {email: 'user2@test.com', password: 'test456', name: 'User 2'}
  ]);
};
