require('dotenv').config();
const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

// Mudando de GET para POST se você pretende usar o corpo da requisição
router.post('/', async (req, res) => {
    const { phoneNumber, message } = req.body;
    console.log(process.env.TWILIO_PHONE_NUMBER, phoneNumber, message )
    client.messages
        .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        })
        .then(message => res.status(200).send(`Message sent: ${message.sid}`))
        .catch(error => res.status(500).send(error.message));
});

module.exports = router;
