const FeedRepository = require("../repository/FeedRepository");

class FeedApprovedListService {
  constructor(feedRepository = new FeedRepository()) {
    this.feedRepository = feedRepository;
  }

  async execute(params) {
    let { title: titleQuery, page, pageSize } = params;

    const feeds = await this.feedRepository.getApprovedFeeds({
      title: titleQuery,
      page,
      pageSize,
    });

    const countFeeds = await this.feedRepository.getTotalApprovedFeeds({
      title: titleQuery,
    });
    const totalFeeds = countFeeds[0].count;

    const result = {
      total: totalFeeds,
      page: page,
      pageSize: pageSize,
      data: feeds,
    };

    return result;
  }
}

module.exports = FeedApprovedListService;
