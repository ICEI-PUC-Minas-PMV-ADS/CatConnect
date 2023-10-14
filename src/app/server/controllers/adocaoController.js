const Adocao = require('../model/adocaoModel'); // Ajuste o caminho com base na estrutura do seu projeto

const adocaoController = {
    // Criar uma nova adoção
    criarAdocao: async (req, res) => {
        try {
            const novaAdocao = await Adocao.create(req.body);
            res.status(201).json(novaAdocao);
        } catch (error) {
            console.error('Erro ao criar adoção:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    // Obter todas as adoções
    obterTodasAdocoes: async (req, res) => {
        try {
            const adocoes = await Adocao.find();
            res.status(200).json(adocoes);
        } catch (error) {
            console.error('Erro ao obter adoções:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    // Obter uma adoção específica por ID
    obterAdocaoPorId: async (req, res) => {
        const { id } = req.params;
        try {
            const adocao = await Adocao.findById(id);
            if (!adocao) {
                return res.status(404).json({ error: 'Adoção não encontrada' });
            }
            res.status(200).json(adocao);
        } catch (error) {
            console.error('Erro ao obter adoção por ID:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    // Atualizar uma adoção específica por ID
    atualizarAdocao: async (req, res) => {
        const { id } = req.params;
        try {
            const adocaoAtualizada = await Adocao.findByIdAndUpdate(id, req.body, { new: true });
            if (!adocaoAtualizada) {
                return res.status(404).json({ error: 'Adoção não encontrada' });
            }
            res.status(200).json(adocaoAtualizada);
        } catch (error) {
            console.error('Erro ao atualizar adoção:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    // Excluir uma adoção específica por ID
    excluirAdocao: async (req, res) => {
        const { id } = req.params;
        try {
            const adocaoExcluida = await Adocao.findByIdAndDelete(id);
            if (!adocaoExcluida) {
                return res.status(404).json({ error: 'Adoção não encontrada' });
            }
            res.status(204).end();
        } catch (error) {
            console.error('Erro ao excluir adoção:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
};

module.exports = adocaoController;
