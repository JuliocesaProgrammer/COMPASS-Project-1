//importação de módulos
const express = require("express");
const winston = require("winston");
const readline = require("readline");
const app = express();
const port = 3000;

// Configuração do Winston
const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

// Middlewares -> registro de requisições
app.use(express.json());
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    timestamp: new Date().toISOString(),
  });
  next();
});

// dfinição das Rotas
const storeRoutes = require("../src/routes/storeRoutes");
app.use("/", storeRoutes);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// CLI -> Interface da linha de comando, aqui temos a interação do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite o CEP para buscar lojas próximas (ex: 01001000): ", async (cep) => {
  try {
    const response = await fetch(`http://localhost:${port}/buscar-lojas/${cep}`);
    const data = await response.json();
    if (data.message) {
      console.log(data.message);
    } else {
      console.log("\nLojas encontradas:");
      data.forEach((loja) => {
        console.log(`
          Nome: ${loja.nome}
          Endereço: CEP ${loja.cep}, Nº ${loja.numero}
          Distância: ${loja.distancia.toFixed(2)} km
        `);
      });
    }
  } catch (error) {
    console.error("Erro:", error.message);
  }
  rl.close();
});
