const express = require('express');

const UsersConstroller = require('./controllers/UsersController');
const handlerErrors = require('./errors/handlerErrors');

const inviteRoutes = require('./routes/inviteRoutes');
const feedRoutes = require('./routes/feedRoutes');

const routes = express.Router();

routes.get('/users', UsersConstroller.index);

routes.post('/users/login', UsersConstroller.login);

routes.post('/users', UsersConstroller.register);

routes.use(inviteRoutes);

routes.use(feedRoutes);

routes.use(handlerErrors);

module.exports = routes;
