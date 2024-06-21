const { ADMIN_NAME, MEMBER_NAME } = require("../utils/RoleUtil");
const UserCreateFeedService = require("./UserCreateFeedService");

describe("UserCreateFeedService", () => {
  let userCreateFeedService;

  beforeEach(() => { });

  afterEach(() => {
    jest.clearAllMocks();
  });

  let params = {
    title: "title",
    content: "content",
    image: "image.com",
    userId: 1,
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
    params.userRole = ADMIN_NAME
    await feedRepository.findFeedByTitle.mockResolvedValue([]);
    await feedRepository.create.mockResolvedValue({ id: 1, ...params });

    userCreateFeedService = new UserCreateFeedService(feedRepository);

    const fakeParamsCreateFeed = {
      title: params.title,
      content: params.content,
      image: `${process.env.API_URL}${params.image}`,
      user_id: params.userId,
      is_pendent: false,
    }

    const result = await userCreateFeedService.execute(params);
    expect(result).toEqual({ id: 1, ...params });
    expect(feedRepository.findFeedByTitle).toHaveBeenCalledWith(params.title);
    expect(feedRepository.create).toHaveBeenCalledWith(fakeParamsCreateFeed);
  });

  it("Should if then user is MEMBER will create feed", async () => {
    params.userRole = MEMBER_NAME
    await feedRepository.findFeedByTitle.mockResolvedValue([]);
    await feedRepository.create.mockResolvedValue({ id: 1, ...params });

    userCreateFeedService = new UserCreateFeedService(feedRepository);
    const fakeParamsCreateFeed = {
      title: params.title,
      content: params.content,
      image: `${process.env.API_URL}${params.image}`,
      user_id: params.userId,
      is_pendent: true,
    }
    const result = await userCreateFeedService.execute(params);
    expect(result).toEqual({ id: 1, ...params });
    expect(feedRepository.findFeedByTitle).toHaveBeenCalledWith(params.title);
    expect(feedRepository.create).toHaveBeenCalledWith(fakeParamsCreateFeed);
  });
});
