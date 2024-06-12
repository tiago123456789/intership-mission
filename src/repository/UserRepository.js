const knex = require("../database/index");

class UserRepository {
  getAllUsers() {
    return knex("users");
  }

  findByEmail(email) {
    return knex("users").where("email", email).limit(1);
  }

  getRoleByRoleId(roleId) {
    return knex("roles").where("id", roleId);
  }

  createUser(newUser) {
    return knex("users").insert(newUser).returning("*");
  }

  createCompany(company) {
    return knex("companies")
      .insert({
        name: company,
      })
      .returning("*");
  }
}

module.exports = UserRepository;
