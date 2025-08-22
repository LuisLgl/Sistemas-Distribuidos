// 1. Carrega as variáveis de ambiente do ficheiro .env
require('dotenv').config();

// 2. Importa os pacotes necessários
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes'); // <-- Importa as novas rotas de livros

// 3. Inicializa a aplicação Express
const app = express();
const PORT = process.env.PORT || 3000;

// 4. Configura os Middlewares
app.use(cors()); 
app.use(express.json());

// 5. Define as Rotas
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // <-- Diz ao Express para usar as rotas de livros

// 6. Inicia o Servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend a rodar em http://localhost:${PORT}`);
});
