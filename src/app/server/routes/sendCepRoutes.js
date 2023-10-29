const express = require('express');
const router = express.Router();
const viaCepController = require('../controllers/viaCepController');

router.get('/:cep', async (req, res) => {
    const { cep } = req.params;

    try {
        const data = await viaCepController.getViaCepData(cep);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
