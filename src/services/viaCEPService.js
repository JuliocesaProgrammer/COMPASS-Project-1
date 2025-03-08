const axios = require("axios");

class ViaCEPService {
  static async getCoordinates(cep) {
    try {
      // Passo 1: Consultar ViaCEP para obter endereço
      const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (viaCepResponse.data.erro) throw new Error("CEP inválido");
      
      // Passo 2: Usar OpenStreetMap para obter coordenadas
      const address = `${viaCepResponse.data.logradouro}, ${viaCepResponse.data.localidade}`;
      const osmResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );

      if (osmResponse.data.length === 0) throw new Error("Coordenadas não encontradas");
      
      return {
        latitude: parseFloat(osmResponse.data[0].lat),
        longitude: parseFloat(osmResponse.data[0].lon),
      };
    } catch (error) {
      throw new Error("Erro ao obter coordenadas: " + error.message);
    }
  }
}

module.exports = ViaCEPService;