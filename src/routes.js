const express = require("express");

const app = express();

const UsersConstroller = require("./controllers/UsersController");
const handlerErrors = require("./errors/handlerErrors");

const inviteRoutes = require("./inviteRoutes");

const routes = express.Router();

routes.get("/users", UsersConstroller.index);

routes.post("/users/login", UsersConstroller.login);

routes.post("/users", UsersConstroller.register);

routes.use(handlerErrors);

routes.use(inviteRoutes);

module.exports = routes;
