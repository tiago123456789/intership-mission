const FeedApprovedListService = require("./FeedApprovedListService");

describe("FeedApprovedListService", () => {
  let feedApprovedListService;

  const feedRepository = {
    getApprovedFeeds: jest.fn(),
    getTotalApprovedFeeds: jest.fn(),
  };

  const mockFeeds = [
    {
      id: "2",
      title: "Feed de member",
      image: "http://localhost:3000/image.png",
      content: "Criado com member",
      created_at: "2024-06-25T14:05:07.627Z",
      is_pendent: true,
      user_id: "2",
    },
    {
      id: "3",
      title: "Feed de member segundo",
      image: "http://localhost:3000/image.png",
      content: "Criado com member segundo",
      created_at: "2024-06-25T14:08:27.224Z",
      is_pendent: true,
      user_id: "2",
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle empty approved feed list", async () => {
    const params = {
      title: undefined,
      page: 1,
      pageSize: 10,
    };

    const result = {
      total: 0,
      page: params.page,
      pageSize: params.pageSize,
      data: [],
    };

    feedRepository.getApprovedFeeds.mockResolvedValue([]);
    feedRepository.getTotalApprovedFeeds.mockResolvedValue([{ count: 0 }]);

    feedApprovedListService = new FeedApprovedListService(feedRepository);

    const feeds = await feedApprovedListService.execute(params);

    expect(feeds).toEqual(result);
  });

  it("should return a list of approved feeds with query string", async () => {
    const params = {
      title: "feed",
      page: 1,
      pageSize: 10,
    };
    const result = {
      total: 2,
      page: params.page,
      pageSize: params.pageSize,
      data: mockFeeds,
    };
    feedRepository.getApprovedFeeds.mockResolvedValue(mockFeeds);
    feedRepository.getTotalApprovedFeeds.mockResolvedValue([{ count: 2 }]);
    feedApprovedListService = new FeedApprovedListService(feedRepository);
    const feeds = await feedApprovedListService.execute(params);
    expect(feeds).toEqual(result);
    expect(feedRepository.getApprovedFeeds).toHaveBeenCalledWith(params);
  });

  it("should return a list of approved feeds without query string of title", async () => {
    const params = {
      title: undefined,
      page: 1,
      pageSize: 10,
    };

    const result = {
      total: 2,
      page: params.page,
      pageSize: params.pageSize,
      data: mockFeeds,
    };
    feedRepository.getApprovedFeeds.mockResolvedValue(mockFeeds);
    feedRepository.getTotalApprovedFeeds.mockResolvedValue([{ count: 2 }]);

    feedApprovedListService = new FeedApprovedListService(feedRepository);

    const feeds = await feedApprovedListService.execute(params);

    expect(feeds).toEqual(result);
  });
});
