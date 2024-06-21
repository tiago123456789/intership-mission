const { ADMIN_NAME } = require("../utils/roleUtil");
const UserCreateFeedService = require("./UserCreateFeedService");

describe("UserCreateFeedService", () => {
  let userCreateFeedService;

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  let params = {
    title: "title",
    content: "content",
    image: "image.com",
    user_id: 1,
    is_pendent: false,
  };

  const feedRepository = {
    findFeedByTitle: jest.fn(),
    create: jest.fn(),
  };

  it("Should throw BussinesError if exist feed by title", async () => {
    try {
      userCreateFeedService = new UserCreateFeedService(feedRepository);

      await feedRepository.findFeedByTitle.mockResolvedValue([
        { title: params.title },
      ]);

      await userCreateFeedService.execute(params);
    } catch (err) {
      expect(err.message).toEqual("O titulo desse feed já está existente.");
    }
  });

  it("Should if then user is ADMIN will create feed", async () => {
    try {
      await feedRepository.findFeedByTitle.mockResolvedValue([{}]);
      await feedRepository.create.mockResolvedValue([{ id: 1, ...params }]);

      userCreateFeedService = new UserCreateFeedService(feedRepository);

      const result = await userCreateFeedService.execute(params);
      expect(result).toEqual({ id: 1, ...params });
      expect(feedRepository.findFeedByTitle).toHaveBeenCalledWith(params.title);
      expect(feedRepository.create).toHaveBeenCalledWith(params);
    } catch (err) {}
  });

  it("Should if then user is MEMBER will create feed", async () => {
    try {
      await feedRepository.findFeedByTitle.mockResolvedValue([{}]);
      await feedRepository.create.mockResolvedValue([{ id: 1, ...params }]);

      params.is_pendent = false;

      userCreateFeedService = new UserCreateFeedService(feedRepository);

      const result = await userCreateFeedService.execute(params);
      expect(result).toEqual({ id: 1, ...params });
      expect(result).toEqual({is_pendent: params.is_pendent})
      expect(feedRepository.findFeedByTitle).toHaveBeenCalledWith(params.title);
      expect(feedRepository.create).toHaveBeenCalledWith(params);
    } catch (err) {}
  });
});
