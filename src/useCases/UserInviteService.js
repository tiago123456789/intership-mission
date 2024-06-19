const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const UserRepository = require("../repository/UserRepository");
const BussinesError = require("../errors/BussinesError");
const MailProvider = require("../adapters/implementations/mailer/MailProvider");
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
    const hash = crypto.randomUUID();

    await userRepository.createInvite({ user_id: userId, hash });

    const link = `${process.env.INVITE_URL}${hash}`;

    const company = await userRepository.getCompanyById(adminCompany);

    const admin = await userRepository.getAdminByRoleIdAndCompanyId(
      ADMIN,
      adminCompany
    );

    const data = {
      name: userCreated[0].name,
      adminName: admin[0].name,
      companyName: company[0].name,
      link: link,
    };

    const emailToSent = {
      to: userCreated[0].email,
      subject: "Convite para empresa",
    };

    await mailProvider.send(data, emailToSent, "../../../views/invite.hbs");
  }
}

module.exports = UserInviteService;
