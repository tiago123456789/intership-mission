const NotFoundError = require("../errors/NotFoundError");
const FeedRepository = require("../repository/FeedRepository");

class ApproveFeedService {
  constructor(feedRepository = new FeedRepository()) {
    this.feedRepository = feedRepository;
  }

  async execute(params) {
    const { id, is_pendent } = params;

    let feedById = await this.feedRepository.getFeedById(id);

    console.log(feedById[0]);

    if (feedById.length == 0) {
      throw new NotFoundError("Feed inexistente.");
    }

    const result = await this.feedRepository.updateIsPendentByIdAndIsPendent(
      id,
      is_pendent
    );

    return result;
  }
}

module.exports = ApproveFeedService;
