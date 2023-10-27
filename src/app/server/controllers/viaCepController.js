const axios = require('axios');

async function getViaCepData(cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao obter dados do CEP.');
    }
}

module.exports = {
    getViaCepData,
};
