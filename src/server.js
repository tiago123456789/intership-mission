require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const emailSend = require("./emails");

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log("Servidor está rodando... "));

emailSend(
  {
    email: "api",
    password: "a0c432feaab9971922c4bfe0f85f56f0"
  },
  {
    email: "guilo6575@gmail.com",
  },
  "enviando texto com nodemailer",
  "testando o envio de email com a biblioteca"
);
