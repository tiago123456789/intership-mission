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

  findByEmailAndCompanyId(email, companyId) {
    return knex("users").where("email", email).where("company_id", "=", companyId).limit(1);
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

  createInvite(invite) {
    return knex("invites").insert(invite)
  }

  getCompanyById(id) {
    return knex("companies").where("id", id).select(["name"]);
  }

  getAdminByRoleIdAndCompanyId(roleId, companyId) {
    return knex("users").where("role_id", "=", roleId).where("company_id", "=", companyId).limit(1);
  }

  getHash(hashCode) {
    return knex("invites").where("hash", "=", hashCode).returning("*")
  }

  updatePasswordByUserId(password, userId) {
    return knex("users").where("id", "=", userId).update({password: password})
  }

  deleteHashInviteByHash(hash) {
    return knex("invites").where("hash", "=", hash).del();
  }
}

module.exports = UserRepository;
