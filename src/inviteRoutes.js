const express = require("express");
const userController = require("./controllers/UsersController");

const jwt = require("jsonwebtoken");

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

async function hasAuthenticated(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token não informado." });
  }

  try {
    token = token.split(" ")[1];

    const payload = await jwt.verify(token, process.env.SECRET_KEY);
    req.role = payload.role;
    req.companyId = payload.companyId;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirou." });
  }
}

router.post(
  "/invite",
  hasAuthenticated,
  authorizeRole("ADMIN"),
  userController.inviteMember
);

module.exports = router;
