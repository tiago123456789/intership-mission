const yup = require("yup");

const UserCreateFeedService = require("../useCases/UserCreateFeedService");
const userCreateFeedService = new UserCreateFeedService();

const FeedApprovedListService = require("../useCases/FeedApprovedListService");
const feedApprovedListService = new FeedApprovedListService();

module.exports = {
  async createFeed(req, res, next) {
    try {
      const { title, content } = req.body;
      const { filename: image } = req.file;
      const userId = req.userId;
      const userRole = req.role;

      const schema = yup.object().shape({
        title: yup.string().required("Titulo é obrigatório."),
        content: yup.string().required("Conteúdo é obrigatório."),
        image: yup.string().required("Imagem é obrigatório."),
      });

      const isValid = schema.isValidSync({ title, content, image });

      if (!isValid) {
        const validate = schema.validateSync(
          { title, content, image },
          { abortEarly: false }
        );
        return res.status(400).json({ message: validate });
      }

      await userCreateFeedService.execute({
        title,
        content,
        image,
        userId,
        userRole,
      });

      return res.status(201).json({});
    } catch (err) {
      next(err);
    }
  },

  async approvedListFeed(req, res, next) {
    try {
      const { title, page, pageSize } = req.query;

      const results = await feedApprovedListService.execute({
        title,
        page,
        pageSize,
      });
      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  },
};
