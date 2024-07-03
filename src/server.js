require('dotenv').config();

const path = require('path');

const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

/* eslint-disable */
app.listen(3000, () => console.log('Servidor está rodando... '));
