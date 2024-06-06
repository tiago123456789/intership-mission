const express = require("express");
const knex = require("./database");

const UsersConstroller = require('./controllers/UsersController');

const routes = express.Router();

routes.get("/users", UsersConstroller.index);

module.exports = routes;