const knex = require("../database");
const bcrypt = require("bcryptjs");

module.exports = {
  // get all users
  async index(req, res) {
    const results = await knex("users");

    return res.json(results);
  },

  async login(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const userByEmail = await knex("users").where("email", email);

    if (userByEmail.length == 0) {
      return res.status(400).json({ message: "Credenciais invalidas!" });
    }

    const isPasswordValued = await bcrypt.compare(
      password,
      userByEmail[0].password
    );

    if (!isPasswordValued) {
      return res.status(400).json({ message: "Credenciais invalidas!" });
    }

    return res.json({});
  },
};
