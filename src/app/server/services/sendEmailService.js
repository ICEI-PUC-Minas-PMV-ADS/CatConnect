// src/services/sendEmailService.js
const nodemailer = require('nodemailer');

class SendEmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                    user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
    }

    sendEmail(to, subject, text) {
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text,
        };

        return new Promise((resolve, reject) => {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
}

module.exports = SendEmailService;
