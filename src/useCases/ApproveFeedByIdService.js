const NotFoundError = require("../errors/NotFoundError");
const FeedRepository = require("../repository/FeedRepository");

class ApproveFeedByIdService {
  constructor(feedRepository = new FeedRepository()) {
    this.feedRepository = feedRepository;
  }

  async execute(params) {
    const { id } = params;

    const is_pendent = false;

    let feedById = await this.feedRepository.getFeedById(id);

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

module.exports = ApproveFeedByIdService;
