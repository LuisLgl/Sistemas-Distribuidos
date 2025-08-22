// Importa o nosso cliente Supabase configurado
const supabase = require('../config/supabaseClient');

// --- FUNÇÃO DE LOGIN (JÁ EXISTENTE) ---
const login = async (req, res) => {
  // ... (o seu código de login continua aqui, sem alterações)
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email e palavra-passe são obrigatórios." });
  }
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return res.status(401).json({ message: error.message });
    }
    return res.status(200).json({ message: "Login bem-sucedido!", user: data.user, session: data.session });
  } catch (error) {
    return res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};


// --- NOVA FUNÇÃO DE REGISTO ---
const register = async (req, res) => {
  const { nome, email, password } = req.body;

  if (!nome || !email || !password) {
    return res.status(400).json({ message: "Nome, email e palavra-passe são obrigatórios." });
  }

  try {
    // Usa a função signUp do Supabase para criar um novo utilizador
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // Podemos passar dados extras, como o nome, que serão guardados no perfil do utilizador
        data: {
          full_name: nome,
        }
      }
    });

    // Se o Supabase devolver um erro (ex: utilizador já existe)
    if (error) {
      console.error('Erro no registo do Supabase:', error.message);
      return res.status(400).json({ message: error.message });
    }

    // Se o registo for bem-sucedido
    // NOTA: 'data.user' pode vir nulo se a confirmação de email estiver ativa.
    console.log('Utilizador registado com sucesso:', data);
    return res.status(201).json({ message: "Registo bem-sucedido! Verifique o seu e-mail para confirmação, se aplicável." });

  } catch (error) {
    console.error('Erro inesperado no servidor:', error);
    return res.status(500).json({ message: "Ocorreu um erro interno no servidor." });
  }
};


// Exportamos ambas as funções
module.exports = {
  login,
  register, // <-- Exporta a nova função
};
