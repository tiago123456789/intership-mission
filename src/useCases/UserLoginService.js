const bcrypt = require('bcryptjs');

const InvalidCredentialsError = require('../errors/InvalidCredentialsError');

const UserRepository = require('../repository/UserRepository');
const GenerateJwtTokenProvider = require('../providers/GenerateJwtTokenProvider');

class UserLoginService {
  constructor(
    userRepository = new UserRepository(),
    bcryptInstance = bcrypt,
    generateJwtTokenProvider = new GenerateJwtTokenProvider(),
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcryptInstance;
    this.generateJwtTokenProvider = generateJwtTokenProvider;
  }

  async execute(params) {
    const { email, password } = params;

    const userByEmail = await this.userRepository.findByEmail(email);

    if (userByEmail.length === 0) {
      throw new InvalidCredentialsError('Credenciais invalidas!');
    }

    const isPasswordValued = await this.bcrypt.compare(
      password,
      userByEmail[0].password,
    );

    if (!isPasswordValued) {
      throw new InvalidCredentialsError('Credenciais invalidas!');
    }

    const role = await this.userRepository.getRoleByRoleId(
      userByEmail[0].role_id,
    );

    const token = this.generateJwtTokenProvider.getToken({
      userId: userByEmail[0].id,
      email: userByEmail[0].email,
      companyId: userByEmail[0].company_id,
      role: role[0].name,
    });

    return token;
  }
}

module.exports = UserLoginService;
