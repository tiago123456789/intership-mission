const bcrypt = require("bcryptjs");

const UserRepository = require("../repository/UserRepository");
const GenerateJwtTokenProvider = require("../providers/GenerateJwtTokenProvider");

const generateJwtTokenProvider = new GenerateJwtTokenProvider();
const userRepository = new UserRepository();

class UserLoginService {
  async execute(params) {
    const { email, password } = params;

    const userByEmail = await userRepository.findByEmail(email);

    if (userByEmail.length == 0) {
      throw new Error("Credenciais invalidas!");
    }

    const isPasswordValued = await bcrypt.compare(
      password,
      userByEmail[0].password
    );

    if (!isPasswordValued) {
      throw new Error("Credenciais invalidas!")
    }

    const role = await userRepository.getRoleByRoleId(userByEmail[0].role_id);

    const token = generateJwtTokenProvider.getToken({
      userId: userByEmail[0].id,
      email: userByEmail[0].email,
      company: userByEmail[0].company_id,
      role: role[0].name,
    });

    return token
  }
}

module.exports = UserLoginService;