COMPASS Project 1

📌 Sobre o Projeto

O COMPASS Project 1 é uma API desenvolvida em Node.js que permite buscar lojas próximas com base em um CEP fornecido pelo usuário. Utiliza a API do ViaCEP para obter o endereço e o OpenStreetMap (Nominatim) para converter o endereço em coordenadas geográficas. Com essas informações, calcula a distância entre o local informado e uma base de lojas cadastradas, retornando as mais próximas.

🚀 Funcionalidades

🔎 Buscar lojas próximas: Informando um CEP, a API retorna uma lista de lojas próximas dentro de um raio de 100 km.

📍 Conversão de CEP em coordenadas geográficas: Utiliza serviços de geolocalização para obter latitude e longitude a partir do CEP.

📏 Cálculo de distância entre pontos geográficos: Implementação da fórmula de Haversine para calcular distâncias.

📜 Registro de logs: O sistema armazena logs das requisições para monitoramento e análise.

🛠️ Tecnologias Utilizadas

Node.js

Express.js

Axios

Winston

OpenStreetMap Nominatim API

ViaCEP API
