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

  createUser(email, password, name, roleId, companyId) {
    return knex("users").insert({
      email: email,
      password: password,
      name: name,
      role_id: roleId,
      company_id: companyId,
    }).returning("*");
  }

  createCompany(company) {
    return knex("companies").insert({
      name: company
    }).returning("*")
  }
}

module.exports = UserRepository;
