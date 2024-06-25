const knex = require("../database/index");

class FeedRepository {
  create(feed) {
    return knex("feeds").insert(feed);
  }

  updateIsPendentByUserId(userId) {
    return knex("feeds")
      .where({ user_id: userId })
      .update({ is_pendent: false });
  }

  findFeedByTitle(title) {
    return knex("feeds").whereRaw("UPPER(title) = ?", [title.toUpperCase()]).limit(1);
  }
}

module.exports = FeedRepository;
