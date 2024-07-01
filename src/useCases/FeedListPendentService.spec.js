const FeedListPendentService = require("./FeedListPendentService");

describe("FeedListPendentService", () => {
  let feedListPendentService;

  const params = {
    companyId: 1,
    page: 1,
    pageSize: 10,
  };

  const feedRepository = {
    getFeedIsPendentByCompanyId: jest.fn(),
    getTotalFeedsIsPendentByCompanyId: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle empty feed list", async () => {
    feedRepository.getFeedIsPendentByCompanyId.mockResolvedValue([]);

    feedRepository.getTotalFeedsIsPendentByCompanyId.mockResolvedValue([
      { count: 0 },
    ]);

    const result = {
      total: 0,
      page: params.page,
      pageSize: params.pageSize,
      data: [],
    };

    feedListPendentService = new FeedListPendentService(feedRepository);

    const feeds = await feedListPendentService.execute(params);

    expect(feeds).toEqual(result);
  });

  it("should return a list of feeds", async () => {
    const mockFeeds = {
      total: 2,
      page: 1,
      pageSize: 10,
      data: [
        {
          id: "1",
          title: "title",
          image: "http://localhost:3000/image.png",
          content: "content",
          created_at: "2024-06-25T14:05:07.627Z",
          is_pendent: true,
          user_id: "1",
        },
        {
          id: "2",
          title: "title",
          image: "http://localhost:3000/image2.png",
          content: "content2",
          created_at: "2024-06-25T14:05:07.627Z",
          is_pendent: false,
          user_id: "2",
        },
      ],
    };

    feedRepository.getFeedIsPendentByCompanyId.mockResolvedValue(mockFeeds.data);
    feedRepository.getTotalFeedsIsPendentByCompanyId.mockResolvedValue([
      { count: 2 },
    ]);

    feedListPendentService = new FeedListPendentService(feedRepository);

    const feeds = await feedListPendentService.execute(params);

    expect(feeds).toEqual(mockFeeds);
  });
});
