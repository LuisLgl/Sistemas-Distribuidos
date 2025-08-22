import axios from 'axios';

// O endereço onde o seu servidor backend está a ser executado
const API_URL = 'http://localhost:3000/api';

export const authService = {
  async login(email, password) {
    try {
      // 1. Faz um pedido POST real para a nossa API no backend
      //    Envia o email e a password no corpo do pedido
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      
      // 2. Se o pedido for bem-sucedido (status 200),
      //    devolve os dados que o backend enviou (utilizador, token, etc.)
      return response.data;

    } catch (error) {
      // 3. Se o backend devolver um erro (ex: status 401 para credenciais inválidas),
      //    o axios irá capturá-lo aqui.
      //    Lançamos a mensagem de erro para que o Login.vue a possa mostrar ao utilizador.
      throw error.response.data.message || 'Ocorreu um erro no login.';
    }
  },

  // ADICIONADO: Função para registar um novo utilizador
  async register(nome, email, password) {
    try {
      // 1. Faz um pedido POST para o endpoint de registo do backend
      const response = await axios.post(`${API_URL}/auth/register`, {
        nome,
        email,
        password,
      });

      // 2. Devolve a resposta de sucesso do backend
      return response.data;

    } catch (error) {
      // 3. Captura e lança a mensagem de erro do backend
      throw error.response.data.message || 'Ocorreu um erro ao tentar registar.';
    }
  }
};
