const BussinesCredentialError = require("../errors/BussinesCredentialError");
const UserRepository = require("../repository/UserRepository");
const userRepository = new UserRepository();

const bcrypt = require("bcryptjs");

class UserRegisterService {
  async execute(params) {
    const { email, password, name, company } = params;

    const userByEmail = await userRepository.findByEmail(email);

    if (userByEmail.length > 0) {
      throw new BussinesCredentialError(
        "Não é possível usar o email informado."
      );
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
  }
}

module.exports = UserRegisterService;
