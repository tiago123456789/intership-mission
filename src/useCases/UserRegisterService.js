const BussinesError = require("../errors/BussinesError");
const UserRepository = require("../repository/UserRepository");
const userRepository = new UserRepository();

const bcrypt = require("bcryptjs");
const { ADMIN } = require("../utils/roleUtil");

class UserRegisterService {
  async execute(params) {
    const { email, password, name, company } = params;

    const userByEmail = await userRepository.findByEmail(email);

    if (userByEmail.length > 0) {
      throw new BussinesError("Não é possível usar o email informado.");
    }

    const companyCreated = await userRepository.createCompany(company);

    const companyId = companyCreated[0].id;

    const passwordHash = bcrypt.hashSync(password, 8);

    const newUser = {
      email: email,
      password: passwordHash,
      name: name,
      role_id: ADMIN,
      company_id: companyId,
    };

    return userRepository.createUser(newUser);
  }
}

module.exports = UserRegisterService;
