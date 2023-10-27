// src/controllers/emailController.js
const EmailSender = require('../services/sendEmailService');

const emailSender = new EmailSender();

const sendEmailController = async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const info = await emailSender.sendEmail(to, subject, text);
        res.status(200).json({ success: true, message: 'E-mail enviado com sucesso', info });
    } catch (error) {
        console.error('Erro no envio do e-mail:', error);
        res.status(500).json({ success: false, message: 'Erro no envio do e-mail', error });
    }
};

module.exports = { sendEmailController };
