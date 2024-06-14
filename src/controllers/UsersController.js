const UserLoginService = require("../useCases/UserLoginService");
const userLoginService = new UserLoginService();

const UserListService = require("../useCases/UserListService");
const userListService = new UserListService();

const UserRegisterService = require("../useCases/UserRegisterService");
const userRegisterService = new UserRegisterService();

const UserInviteService = require("../useCases/UserInviteService");
const userInviteService = new UserInviteService();

module.exports = {
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
    try {
      await userInviteService.execute(req);

      res.status(201).json({message: "Usuário MEMBER criado!"})
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  },
};
