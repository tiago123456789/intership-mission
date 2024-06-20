const UserRepository = require("../repository/UserRepository");

class UserListService {
  constructor(userRepository = new UserRepository()) {
    this.userRepository = userRepository;
  }
  async execute() {
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}

module.exports = UserListService;
