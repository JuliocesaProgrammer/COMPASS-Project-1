const express = require("express");
const router = express.Router(); // Inicialização correta do router
const ViaCEPService = require("../services/viaCEPService");
const stores = require("../data/stores");
const { calculateDistance } = require("../utils/geoUtils");

// Rota para buscar lojas
router.get("/buscar-lojas/:cep", async (req, res) => {
  try {
    const { cep } = req.params;
    const { latitude, longitude } = await ViaCEPService.getCoordinates(cep);

    const lojasProximas = stores
      .map((loja) => ({
        ...loja,
        distancia: calculateDistance(latitude, longitude, loja.latitude, loja.longitude),
      }))
      .filter((loja) => loja.distancia <= 100)
      .sort((a, b) => a.distancia - b.distancia);

    if (lojasProximas.length === 0) {
      return res.status(404).json({ message: "Nenhuma loja próxima encontrada." });
    }

    res.json(lojasProximas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; // Exportação correta do router