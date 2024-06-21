const BussinesError = require("../errors/BussinesError");
const FeedRepository = require("../repository/FeedRepository");
const { ADMIN_NAME } = require("../utils/roleUtil");

class UserCreateFeedService {
  constructor(feedRepository = new FeedRepository()) {
    this.feedRepository = feedRepository;
  }

  async execute(params) {
    const { title, content, image, userId, userRole } = params;

    const imageLink = process.env.API_URL + image;

    const feedByTitle = await this.feedRepository.findFeedByTitle(title);

    if (feedByTitle.length > 0) {
      throw new BussinesError("O titulo desse feed já está existente.");
    }

    const feed = {
      title,
      content,
      image: imageLink,
      user_id: userId,
      is_pendent: null,
    };

    feed.is_pendent = userRole === ADMIN_NAME ? false : true;

    return this.feedRepository.create(feed);
  }
}

module.exports = UserCreateFeedService;
