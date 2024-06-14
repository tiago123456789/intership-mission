const { randomUUID } = require("crypto");
const bcrypt = require("bcryptjs");
const UserRepository = require("../repository/UserRepository");
const BussinesError = require("../errors/BussinesError");
const emailSend = require("../emails");
const MailProvider = require('../adapters/implementations/mailer/MailProvider');
const mailProvider = new MailProvider();
const { MEMBER, ADMIN } = require("../utils/roleUtil");
const userRepository = new UserRepository();

class UserInviteService {
  async execute(params) {
    const { email, name } = params;

    const adminCompany = parseInt(params.companyId);
    const userByEmailAndCompanyId =
      await userRepository.findByEmailAndCompanyId(email, adminCompany);

    if (userByEmailAndCompanyId.length > 0) {
      throw new BussinesError("Email já está em uso.");
    }

    const newUser = {
      email,
      password: await bcrypt.hash(process.env.TMP_PASSWORD, 8),
      name,
      company_id: adminCompany,
      role_id: MEMBER,
    };

    const userCreated = await userRepository.createUser(newUser);

    const userId = userCreated[0].id;
    const hash = randomUUID();

    await userRepository.createInvite({ user_id: userId, hash });

    const link = `${process.env.INVITE_URL}${hash}`;

    const company = await userRepository.getCompanyById(adminCompany);

    const admin = await userRepository.getAdminByRoleIdAndCompanyId(
      ADMIN,
      adminCompany
    );

    await mailProvider.emailSend(userCreated[0], admin[0].name, company[0].name, link);
  }
}

module.exports = UserInviteService;
