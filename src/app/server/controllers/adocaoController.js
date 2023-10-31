const Adocao = require('../model/adocaoModel'); // Ajuste o caminho com base na estrutura do seu projeto
const Adotante = require("../model/adotanteModel");

const adocaoController = {
    // Criar uma nova adoção
    criarAdocao: async (req, res) => {
        try {
            const novaAdocao = await Adocao.create(req.body);
            res.status(201).json(novaAdocao);
        } catch (error) {

            console.error('Erro ao criar adoção nova:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
    criarAdocaoComAdotante: async (req, res) => {
        try {
            const data = req.body;
            const formattedCPF = data.cpf.replace(/[-.()]/g, '');
            const formattedTelefone = data.telefone.replace(/[-() ]/g, '');
            const formattedCEP = data.cep.replace(/[-.() ]/g, '');

            if (!data.id_adotante) {
                const adotanteData = {
                    nome: data.adotante,
                    cpf: formattedCPF,
                    telefone: formattedTelefone,
                    cep: formattedCEP,
                    rua: data.rua,
                    bairro: data.bairro,
                    cidade: data.cidade,
                    email: data.email
                };
                const adotante = await Adotante.create(adotanteData);

                data.id_adotante = adotante._id.toString();
                const camposParaRemover = [
                    "cep", "bairro", "rua", "cpf", "cidade", "telefone", "email"
                ];
                camposParaRemover.forEach(campo => {
                    if (data[campo]) {
                        delete data[campo];
                    }
                });

                const novaAdocao = await Adocao.create(data);
                res.status(201).json(novaAdocao);
            } else {
                const novaAdocao = await Adocao.create(data);
                res.status(201).json(novaAdocao);
            }
        } catch (error) {
            console.error('Erro ao criar adoção e adotante', error);
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

            const dadosAdotante = {
                nome:  req.body.nome,
                cpf:  req.body.cep,
                telefone:  req.body.cep,
                cep:  req.body.cep,
                rua: req.body.rua,
                bairro:  req.body.bairro,
                cidade:  req.body.cidade,
                email: req.body.email
            };
            const adotante = await Adotante.findByIdAndUpdate(req.body.id_adotante, dadosAdotante);
            if (!adocaoAtualizada || !adotante) {
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
            res.status(200).end();
        } catch (error) {
            console.error('Erro ao excluir adoção:', error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },
};

module.exports = adocaoController;
