const express = require("express");
const feedController = require("../controllers/FeedController");

const hasAuthenticated = require("../middlewares/hasAuthenticated");
const authorizeRole = require("../middlewares/authorizeRole");

const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".")[1];

    const newNameFile = require("crypto").randomBytes(64).toString("hex");

    cb(null, `${newNameFile}.${fileExtension}`);
  },
});

const upload = multer({ storage });

router.post(
  "/feeds",
  upload.single("image"),
  hasAuthenticated,
  feedController.createFeed
);

router.get(
  "/feeds/pending",
  hasAuthenticated,
  authorizeRole("ADMIN"),
  feedController.listFeedPendent
);

module.exports = router;
