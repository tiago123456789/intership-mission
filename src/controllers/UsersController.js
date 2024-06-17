const yup = require("yup");

const UserLoginService = require("../useCases/UserLoginService");
const userLoginService = new UserLoginService();

const UserListService = require("../useCases/UserListService");
const userListService = new UserListService();

const UserRegisterService = require("../useCases/UserRegisterService");
const userRegisterService = new UserRegisterService();

const UserInviteService = require("../useCases/UserInviteService");
const userInviteService = new UserInviteService();

const UserConfirmInviteService = require("../useCases/UserConfirmInviteService");
const userConfirmInviteService = new UserConfirmInviteService();

module.exports = {
  async index(req, res) {
    try {
      const results = await userListService.execute();

      return res.json(results);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const schema = yup.object().shape({
        email: yup.string().required("Email é obrigatório."),
        password: yup.string().required("Senha não foi inserida."),
      });

      const isValid = schema.isValidSync({ email, password });

      if (!isValid) {
        const validate = schema.validateSync({ email, password });
        return res.status(400).json({ message: validate });
      }

      const token = await userLoginService.execute({ email, password });
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
  },

  async register(req, res, next) {
    try {
      const { email, password, name, company } = req.body;

      const schema = yup.object().shape({
        email: yup.string().required("Email é obrigatório."),
        password: yup.string().required("Senha não foi inserida."),
        name: yup.string().required("Nome é obrigatório."),
        company: yup.string().required("Empresa é obrigatório"),
      });

      const isValid = schema.isValidSync({ email, password, name, company });

      if (!isValid) {
        const validate = schema.validateSync({
          email,
          password,
          name,
          company,
        });
        return res.status(400).json({ message: validate });
      }

      await userRegisterService.execute({ email, password, name, company });
      return res.status(201).json({});
    } catch (err) {
      return next(err);
    }
  },

  async inviteMember(req, res, next) {
    try {
      const { email, name } = req.body;

      const schema = yup.object().shape({
        email: yup.string().required("Email é obrigatório."),
        name: yup.string().required("Nome é obrigatório."),
      });

      const isValid = schema.isValidSync({ email, name });

      if (!isValid) {
        const validate = schema.validateSync({ email, name });
        return res.status(400).json({ message: validate });
      }

      await userInviteService.execute({
        email,
        name,
        companyId: req.companyId,
      });

      return res.status(201).json({});
    } catch (err) {
      return next(err);
    }
  },

  async confirmInvite(req, res, next) {
    try {
      const { password } = req.body;

      const { hash } = req.params;

      const schema = yup.object().shape({
        password: yup.string().required("Senha é obrigatório."),
      });

      const isValid = schema.isValidSync({ password });

      if (!isValid) {
        const validate = schema.validateSync({ password });
        return res.status(400).json({ message: validate });
      }

      await userConfirmInviteService.execute({ password, hash });

      return res.json({});
    } catch (err) {
      return next(err);
    }
  },
};
