const ApproveFeedService = require("./ApproveFeedService");

describe("ApproveFeedService", () => {
  let approveFeedService;

  const feedRepository = {
    getFeedById: jest.fn(),
    updateIsPendentByIdAndIsPendent: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFeed = [
    {
      id: "1",
      title: "Feed de member",
      image: "http://localhost:3000/image.png",
      content: "Criado com member",
      created_at: "2024-06-25T14:05:07.627Z",
      is_pendent: true,
      user_id: "1",
    },
  ];

  it("Should to throw NotFoundError if not exist feed to approve", async () => {
    try {
      const params = {
        id: 1,
        is_pendent: false,
      };

      feedRepository.getFeedById.mockResolvedValue([]);

      approveFeedService = new ApproveFeedService(feedRepository);

      await approveFeedService.execute(params);
    } catch (err) {
      expect(err.message).toEqual("Feed inexistente.");
    }
  });

  it("Should return feed by id", async () => {
    const params = {
      id: 1,
      is_pendent: false,
    };

    const fakeMockFeed = [
      {
        id: "1",
        title: "Feed de member",
        image: "http://localhost:3000/image.png",
        content: "Criado com member",
        created_at: "2024-06-25T14:05:07.627Z",
        is_pendent: false,
        user_id: "1",
      },
    ];

    feedRepository.getFeedById.mockResolvedValue(mockFeed);
    feedRepository.updateIsPendentByIdAndIsPendent.mockResolvedValue(
      fakeMockFeed
    );

    approveFeedService = new ApproveFeedService(feedRepository);

    const result = await approveFeedService.execute(params);

    expect(result).toEqual(fakeMockFeed);
  });
});
