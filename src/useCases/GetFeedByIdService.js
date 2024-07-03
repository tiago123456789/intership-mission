const NotFoundError = require('../errors/NotFoundError');
const FeedRepository = require('../repository/FeedRepository');

class GetFeedByIdService {
  constructor(feedRepository = new FeedRepository()) {
    this.feedRepository = feedRepository;
  }

  async execute(params) {
    const { id } = params;

    const result = await this.feedRepository.getFeedById(id);

    if (result.length === 0) {
      throw new NotFoundError('Feed não foi encontrado.');
    }

    return result;
  }
}

module.exports = GetFeedByIdService;
