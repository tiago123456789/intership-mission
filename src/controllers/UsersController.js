const UserLoginService = require("../useCases/UserLoginService");
const userLoginService = new UserLoginService();
const UserListService = require("../useCases/UserListService");
const UserRepository = require("../repository/UserRepository");
const userRepository = new UserRepository();
const userListService = new UserListService();

const bcrypt = require('bcryptjs');

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
    const { email, password, name, company } = req.body;

    const userByEmail = await userRepository.findByEmail(email);

    if(userByEmail.length > 0) {
      return res.status(409).json({ message: "Não é possível usar o email informado." })
    }

    const companyCreated = await userRepository.createCompany(company);

    const companyId = companyCreated[0].id;

    const passwordHash = bcrypt.hashSync(password, 8);

    const userCreated = await userRepository.createUser(
      email,
      passwordHash,
      name,
      1,
      companyId
    );

    console.log(userCreated);

    return res.json();
  },
};
