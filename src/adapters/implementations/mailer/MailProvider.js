const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

class MailProvider {
  constructor() {
    this.client = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async send(data, email, pathTemplate) {
    const emailTemplateSource = fs.readFileSync(
      path.join(__dirname, pathTemplate),
      'utf8',
    );

    const template = handlebars.compile(emailTemplateSource);

    const messageToSend = template(data);

    const emailToSent = {
      from: process.env.MAIL_FROM,
      to: email.to,
      subject: email.subject,
      html: messageToSend,
    };
    return new Promise((resolve, reject) => {
      this.client.sendMail(emailToSent, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }
}

module.exports = MailProvider;
