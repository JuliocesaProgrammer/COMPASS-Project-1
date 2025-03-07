const axios = require('axios');
require('dotenv').config();

//cria uma função que recebe um endereço e retorna a latitude e longitude'
const geocoding = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
    );
    return response.data.results[0].geometry.location;
  } catch (error) {
    throw new error("Falha ao geocodificar o endereço");
  }
}

module.exports = geocoding;