
const UserRepository = require("../repository/UserRepository");

const userRepository = new UserRepository();

class UserListService {
  async execute() {
    const users = await userRepository.getAllUsers();
    return users;
  }
}

module.exports = UserListService;
