const express = require('express');
const userController = require('../controllers/UsersController');

const hasAuthenticated = require('../middlewares/hasAuthenticated');
const authorizeRole = require('../middlewares/authorizeRole');

const router = express.Router();

router.post(
  '/invite',
  hasAuthenticated,
  authorizeRole('ADMIN'),
  userController.inviteMember,
);

router.put('/confirmation-invites/:hash', userController.confirmInvite);

module.exports = router;
