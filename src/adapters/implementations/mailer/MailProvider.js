const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");


class MailProvider {
  constructor() {
    this.cliente = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.TRANSPORT_USER,
        pass: process.env.TRANSPORT_PASS,
      },
    });
  }

  async emailSend(user, adminName, companyName, link) {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, "../../../template.hbs"),
      "utf8"
    );

    const template = handlebars.compile(emailTemplateSource);

    const messageToSend = template({
      name: user.name,
      link,
      adminName,
      companyName,
    });

    const emailToSent = {
      from: process.env.MAIL_FROM,
      to: user.email,
      subject: "Hello world",
      text: "Hello world",
      html: messageToSend,
    };

    this.cliente.sendMail(emailToSent, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  }
}

module.exports = MailProvider;
