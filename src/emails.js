const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

handlebars.registerHelper("translate", translate);

function translate(key, language) {
  const transactions = { PT: { HELLO: "Olá", MESSAGE: "Seja Bem vindo" }, EN: { HELLO: "Hi", MESSAGE: "Welcome" } };
  return transactions[language][key];
}

const emailSend = () => {
  const emailTemplateSource = fs.readFileSync(
    path.join(__dirname, "/template.hbs"),
    "utf8"
  );

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ccfbab14835afc",
      pass: "e3c918d89993b1",
    },
  });

  const link = "https://www.google.com";

  const template = handlebars.compile(emailTemplateSource);

  const messageToSend = template({
    name: "Guilherme",
    link: link,
    language: "PT",
  });

  const emailToSent = {
    from: "root@root.com",
    to: "root@root.com",
    subject: "Hello world",
    text: "Hello world",
    html: messageToSend,
  };

  transport.sendMail(emailToSent, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};

emailSend();

module.exports = emailSend;