// Este arquivo simula 100% a nossa API de autenticação.
// Ele NÃO faz nenhuma chamada de rede real.

export const authService = {
  login(email, password) {
    // Usamos uma Promise para simular que a operação leva um tempo, como uma API de verdade.
    return new Promise((resolve, reject) => {
      
      // Simula o tempo de espera da rede (1 segundo)
      setTimeout(() => {
        // Lógica de validação TOTALMENTE FALSA, apenas para teste
        if (email === 'teste@gmail.com' && password === '123456') {
          console.log('SIMULAÇÃO: Login VÁLIDO.');
          // Se o login for válido, a "Promise" é resolvida com sucesso.
          resolve({
            token: "token-falso-gerado-pelo-frontend-123",
            user: { name: "Aurea Macedo" }
          });
        } else {
          console.log('SIMULAÇÃO: Login INVÁLIDO.');
          // Se for inválido, a "Promise" é rejeitada com uma mensagem de erro.
          reject('E-mail ou senha inválidos.');
        }
      }, 1000); // 1 segundo de atraso para parecer real
    });
  }
};