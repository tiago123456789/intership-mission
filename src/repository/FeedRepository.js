const { query } = require("express");
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
    return knex("feeds")
      .whereRaw("UPPER(title) = ?", [title.toUpperCase()])
      .limit(1);
  }

  getApprovedFeeds(params) {
    let { page, pageSize } = params;

    if (page < 1) page = 1;

    let offset = (page - 1) * pageSize;
    return knex("feeds")
      .limit(pageSize)
      .offset(offset)
      .where("is_pendent", "=", false)
      .modify((query) => {
        if (params.title) {
          query.whereILike("title", `%${params.title}%`);
        }
      })
      .orderBy("id", "desc");
  }

  getTotalApprovedFeeds(params) {
    return knex("feeds")
      .where("is_pendent", "=", false)
      .count("feeds.id")
      .modify((query) => {
        if (params.title) {
          query.whereILike("title", `%${params.title}%`);
        }
      });
  }
}

module.exports = FeedRepository;
