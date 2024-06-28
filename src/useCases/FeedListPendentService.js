const FeedRepository = require("../repository/FeedRepository");

class FeedListPendentService {
  constructor(feedRepository = new FeedRepository()) {
    this.feedRepository = feedRepository;
  }

  async execute(params) {
    const feedList = await this.feedRepository.getFeedIsPendentByCompanyId(
      params
    );

    const countFeeds =
      await this.feedRepository.getTotalFeedsIsPendentByCompanyId(params);

    const total = countFeeds[0].count;

    const result = {
      total: total,
      page: params.page,
      pageSize: params.pageSize,
      data: feedList,
    };

    return result;
  }
}

module.exports = FeedListPendentService;
