const UserLoginService = require("../useCases/UserLoginService");
const userLoginService = new UserLoginService();
const UserListService = require("../useCases/UserListService");
const userListService = new UserListService();
const UserRegisterService = require("../useCases/UserRegisterService");
const userRegisterService = new UserRegisterService();

const bcrypt = require("bcryptjs");

module.exports = {
  // get all users
  async index(req, res) {
    try {
      const results = await userListService.execute();

      return res.json(results);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  async login(req, res, next) {
    try {
      const token = await userLoginService.execute(req.body);
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  },

  async register(req, res, next) {
    try {
      await userRegisterService.execute(req.body);
      return res.status(201).json({});
    } catch (err) {
      return next(err);
    }
  },

  async inviteMember(req, res, next) {
    const { email, name } = req.body;

    if (!email || !name) {
      throw new InvalidCredentialsError("Email e Nome são obrigatórios.");
    }

    try {
      const newUser = {
        email,
        password: await bcrypt.hash("senha_temporaria", 10),
        name,
        role_id: 2,
      };
    } catch (err) {}
  },
};
