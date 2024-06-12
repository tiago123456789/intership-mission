require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const passport = require("passport");

const app = express();
app.use(express.json());
app.use(routes);
app.use(passport.initialize())

app.listen(3000, () => console.log("Servidor está rodando... "));
