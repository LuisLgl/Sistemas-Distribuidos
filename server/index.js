// 1. Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// 2. Importa os pacotes necessários
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// 3. Inicializa o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;

// 4. Configura os Middlewares
// CORS é essencial para permitir que seu frontend se comunique com este backend
app.use(cors()); 
// Permite que o Express entenda o corpo de requisições em JSON
app.use(express.json());

// 5. Define as Rotas
app.use('/api/auth', authRoutes);

// 6. Inicia o Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});
