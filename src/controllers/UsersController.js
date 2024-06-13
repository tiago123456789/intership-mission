const UserLoginService = require("../useCases/UserLoginService");
const userLoginService = new UserLoginService();
const UserListService = require("../useCases/UserListService");
const userListService = new UserListService();
const UserRegisterService = require("../useCases/UserRegisterService");
const userRegisterService = new UserRegisterService();

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

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

    /*
    const { email, name } = req.body;

    if (!email || !name) {
      throw new InvalidCredentialsError("Email e Nome são obrigatórios.");
    }

    if (!token) {
      return res.status(401).json({ message: "Token não informado." });
    }

    let token = req.headers.authorization;

    try {
      token = token.split(" ")[1];
      const payload = await jwt.verify(token, process.env.SECRET_KEY);

      const adminCompany = payload.companyId;
      
      console.log(req.body.email);

      const newUser = {
        email,
        password: await bcrypt.hash("senha_temporaria", 10),
        name,
        companyId: Number(adminCompany),
        roleId: 2,
      };


      res.status(200).json({ message: "Usuário convidado com sucesso." });
    } catch (err) {
      res.status().json({ message: err.message });
      next();
    }
    */
  },
};
