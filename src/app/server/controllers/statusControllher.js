const Status = require('../model/statusModel');

exports.criarStatus = async (req, res) => {
    try {
        const novoStatus = await Status.create(req.body);
        res.status(201).json({ status: 'success', data: novoStatus });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.obterTodosStatus = async (req, res) => {
    try {
        const status = await Status.find();
        res.status(200).json({ status: 'success', data: status });
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};


