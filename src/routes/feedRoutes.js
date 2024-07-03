const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const feedController = require('../controllers/FeedController');

const hasAuthenticated = require('../middlewares/hasAuthenticated');
const authorizeRole = require('../middlewares/authorizeRole');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const fileExtension = file.originalname.split('.')[1];

    const newNameFile = crypto.randomBytes(64).toString('hex');

    cb(null, `${newNameFile}.${fileExtension}`);
  },
});

const upload = multer({ storage });

router.post(
  '/feeds',
  upload.single('image'),
  hasAuthenticated,
  feedController.createFeed,
);

router.get('/feeds', feedController.approvedListFeed);

router.get(
  '/feeds/pending',
  hasAuthenticated,
  authorizeRole('ADMIN'),
  feedController.listFeedPendent,
);

router.get('/feeds/:id', feedController.getFeedById);

module.exports = router;
