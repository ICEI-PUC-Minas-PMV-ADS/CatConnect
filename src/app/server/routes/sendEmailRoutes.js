const express = require('express');
const router = express.Router();
const sendEmailController = require('../controllers/sendEmailController');


router.post('/send-email', sendEmailController.sendEmailController);

module.exports = router;
