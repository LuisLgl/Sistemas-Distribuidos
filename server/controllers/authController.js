// Importa o nosso cliente Supabase configurado
const supabase = require('../config/supabaseClient');

// A função de login agora é 'async' para poder esperar pela resposta do Supabase
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e palavra-passe são obrigatórios." });
  }

  try {
    // Usa a função de autenticação real do Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // Se o Supabase devolver um erro (ex: palavra-passe incorreta)
    if (error) {
      console.error('Erro de autenticação do Supabase:', error.message);
      return res.status(401).json({ message: "Credenciais inválidas. Verifique o seu e-mail e palavra-passe." });
    }

    // Se o login for bem-sucedido
    console.log('Utilizador autenticado com sucesso:', data.user.email);
    return res.status(200).json({
      message: "Login bem-sucedido!",
      user: data.user,
      session: data.session, // A sessão contém o token de acesso (JWT)
    });

  } catch (error) {
    console.error('Erro inesperado no servidor:', error);
    return res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};

module.exports = {
  login,
};
