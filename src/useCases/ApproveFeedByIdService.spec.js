const ApproveFeedByIdService = require("./ApproveFeedByIdService");

describe("ApproveFeedByIdService", () => {
  let approveFeedByIdService;

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

      approveFeedByIdService = new ApproveFeedByIdService(feedRepository);

      await approveFeedByIdService.execute(params);
    } catch (err) {
      expect(err.message).toEqual("Feed inexistente.");
    }
  });

  it("Should approve feed by id", async () => {
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

    approveFeedByIdService = new ApproveFeedByIdService(feedRepository);

    const result = await approveFeedByIdService.execute(params);

    expect(result).toEqual(fakeMockFeed);
  });
});
