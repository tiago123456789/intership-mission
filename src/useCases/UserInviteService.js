const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const UserRepository = require("../repository/UserRepository");
const userRepository = new UserRepository();

class UserInviteService {
  async execute(params) {
    let token = params.headers.authorization;

    token = token.split(" ")[1];

    const payload = await jwt.verify(token, process.env.SECRET_KEY);

    const { email, name } = params.body;

    if (!email || !name) {
      throw new InvalidCredentialsError("Email e Nome são obrigatórios.");
    }

    const adminCompany = Number(payload.companyId);

    const newUser = {
      email,
      password: await bcrypt.hash("senha_temporaria", 10),
      name,
      company_id: adminCompany,
      role_id: 2,
    };

    return userRepository.createUser(newUser);
  }
}

module.exports = UserInviteService;
