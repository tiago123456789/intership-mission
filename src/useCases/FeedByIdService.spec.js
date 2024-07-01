const FeedByIdService = require("./FeedByIdService");

describe("FeedByIdService", () => {
  let feedByIdService;

  const params = {
    id: 1,
  };

  const mockFeed = {
    id: "1",
    title: "title",
    image: "http://localhost:3000/image.png",
    content: "content",
    created_at: "2024-06-25T14:05:07.627Z",
    is_pendent: true,
    user_id: "1",
  };

  const feedRepository = {
    getFeedById: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should throw NotFoundError if feed by id is not exist", async () => {
    try {
      feedRepository.getFeedById.mockResolvedValue([]);

      feedByIdService = new FeedByIdService(feedRepository);

      const result = await feedByIdService.execute(params);

      expect(result).toEqual([]);
    } catch (err) {
      expect(err.message).toEqual("Feed não foi encontrado.");
    }
  });

  it("Should return a feed by id", async () => {
    feedRepository.getFeedById.mockResolvedValue(mockFeed);

    feedByIdService = new FeedByIdService(feedRepository);

    const result = await feedByIdService.execute(params);

    expect(result).toEqual(mockFeed);
  });
});
