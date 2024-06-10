const UserLoginService = require("../useCases/UserLoginService");
const userLoginService = new UserLoginService();
const UserRepository = require("../repository/UserRepository");
const userRepository = new UserRepository();

module.exports = {
  // get all users
  async index(req, res) {
    const results = await userRepository.getAllUsers();

    return res.json(results);
  },

  async login(req, res) {
    try {
      const token = await userLoginService.execute(req.body);
      return res.json({ token });
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },
};
