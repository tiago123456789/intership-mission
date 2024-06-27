const FeedRepository = require("../repository/FeedRepository");

class FeedApprovedListService {
  constructor(feedRepository = new FeedRepository()) {
    this.feedRepository = feedRepository;
  }

  async execute(params) {
    let { title: titleQuery, page, pageSize } = params;

    const feeds = await this.feedRepository.getApprovedFeeds({
      page,
      pageSize,
    });

    const countFeeds = await this.feedRepository.getTotalApprovedFeeds();
    const totalFeeds = countFeeds[0].count;

    const result = {
      total: totalFeeds,
      page: page,
      pageSize: pageSize,
      data: feeds,
    };

    if (titleQuery != undefined) {
      const titleSplitted = titleQuery.split("+");
      const titleFinal = titleSplitted.join(" ");

      const feedByTitle = await this.feedRepository.findApprovedFeedsByTitle({
        title: titleFinal,
        page,
        pageSize,
      });


      const countFeeds = await this.feedRepository.getTotalApprovedFeedsByTitle(
        {
          title: titleQuery,
        }
      );

      const totalFeeds = countFeeds[0].count;

      const resultFeedsByTitle = {
        total: totalFeeds,
        page: page,
        pageSize: pageSize,
        data: feedByTitle,
      };

      return resultFeedsByTitle;
    }

    return result;
  }
}

module.exports = FeedApprovedListService;
