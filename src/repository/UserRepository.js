const knex = require("../database/index");

class UserRepository {
  getAllUsers() {
    return knex("users");
  }

  findByEmail(email) {
    return knex("users").where("email", email);
  }

  getRoleByRoleId(roleId) {
    return knex("roles").where("id", roleId);
  }
}

module.exports = UserRepository;
