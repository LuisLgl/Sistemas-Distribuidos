const supabase = require('../config/supabaseClient');

// --- CRIAR UM NOVO LIVRO ---
const createBook = async (req, res) => {
  const { titulo, autor, ano, paginas } = req.body;
  const imagemFile = req.file;

  if (!titulo || !autor || !imagemFile) {
    return res.status(400).json({ message: 'Título, autor e imagem da capa são obrigatórios.' });
  }

  try {
    const nomeFicheiro = `${Date.now()}-${imagemFile.originalname}`;
    const { error: uploadError } = await supabase.storage
      .from('capas_livros')
      .upload(nomeFicheiro, imagemFile.buffer, { contentType: imagemFile.mimetype });

    if (uploadError) throw new Error('Não foi possível fazer o upload da imagem.');

    const { data: urlData } = supabase.storage
      .from('capas_livros')
      .getPublicUrl(nomeFicheiro);

    const imagemUrl = urlData.publicUrl;

    const { data: bookData, error: insertError } = await supabase
      .from('livros')
      .insert([{ titulo, autor, ano, paginas, imagem: imagemUrl }])
      .select();

    if (insertError) throw insertError;

    res.status(201).json(bookData[0]);
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.', error: error.message });
  }
};

// --- BUSCAR TODOS OS LIVROS (COM FILTRO) ---
const getBooks = async (req, res) => {
  const { search } = req.query;
  try {
    let query = supabase.from('livros').select('*');
    if (search) {
      query = query.or(`titulo.ilike.%${search}%,autor.ilike.%${search}%,ano::text.ilike.%${search}%`);
    }
    const { data, error } = await query.order('titulo', { ascending: true });
    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};

// --- BUSCAR UM ÚNICO LIVRO PELO ID ---
const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase.from('livros').select('*').eq('id', id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Livro não encontrado.' });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o livro.', error: error.message });
  }
};

// --- ATUALIZAR UM LIVRO (AGORA COM UPLOAD DE IMAGEM OPCIONAL) ---
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano, paginas } = req.body;
  const imagemFile = req.file;
  let imagemUrl = req.body.imagem; // Começa com o URL antigo, se houver

  try {
    // Se uma nova imagem foi enviada, faz o upload dela
    if (imagemFile) {
      const nomeFicheiro = `${Date.now()}-${imagemFile.originalname}`;
      const { error: uploadError } = await supabase.storage
        .from('capas_livros')
        .upload(nomeFicheiro, imagemFile.buffer, { contentType: imagemFile.mimetype });

      if (uploadError) throw new Error('Não foi possível fazer o upload da nova imagem.');

      const { data: urlData } = supabase.storage.from('capas_livros').getPublicUrl(nomeFicheiro);
      imagemUrl = urlData.publicUrl;
    }

    // Atualiza os dados no banco de dados
    const { data, error } = await supabase
      .from('livros')
      .update({ titulo, autor, ano, paginas, imagem: imagemUrl })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Livro não encontrado para atualizar.' });

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o livro.', error: error.message });
  }
};

// --- APAGAR UM LIVRO ---
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase.from('livros').delete().eq('id', id);
    if (error) throw error;
    res.status(200).json({ message: 'Livro apagado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao apagar o livro.', error: error.message });
  }
};

// --- APAGAR MÚLTIPLOS LIVROS ---
const deleteMultipleBooks = async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: 'Um array de IDs é obrigatório.' });
  }
  try {
    const { error } = await supabase.from('livros').delete().in('id', ids);
    if (error) throw error;
    res.status(200).json({ message: 'Livros apagados com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao apagar os livros.', error: error.message });
  }
};

// Exporta todas as funções
module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  deleteMultipleBooks,
};
