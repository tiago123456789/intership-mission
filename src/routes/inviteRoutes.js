const express = require("express");
const userController = require("../controllers/UsersController");

const hasAuthenticated = require('../middlewares/hasAuthenticated');

const router = express.Router();

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.role !== role.toUpperCase()) {
      return res
        .status(403)
        .json({ message: "Sem permissão para realizar essa ação." });
    }
    next();
  };
}

router.post(
  "/invite",
  hasAuthenticated,
  authorizeRole("ADMIN"),
  userController.inviteMember
);

router.put("/confirmation-invites/:hash", userController.confirmInvite)

module.exports = router;
