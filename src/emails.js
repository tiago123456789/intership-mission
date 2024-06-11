const nodemailer = require("nodemailer");

const emailSend = (senderUser, recipientUser, title, textEmail) => {

    const sender = nodemailer.createTransport({
        host: 'live.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
            user: senderUser.email,
            pass: senderUser.password
        }
    });

    const emailToSent = {
        from: senderUser.email,
        to: recipientUser.email,
        subject: title,
        text: textEmail
    };

    sender.sendMail(emailToSent, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ', info.response)
        }
    })
}

module.exports = emailSend;