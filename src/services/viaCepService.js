const axios = require('axios');

//cria uma função que recebe um CEP e retorna o endereço
const fetchAddressByCEP = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar CEP');
    }
};

module.exports = {
    fetchAddressByCEP,
};