const supabase = require('../config/supabaseClient');

const createBook = async (req, res) => {
  // Os dados de texto vêm do corpo do pedido (req.body)
  const { titulo, autor, ano, paginas } = req.body;
  // O ficheiro da imagem vem de req.file, processado pelo multer
  const imagemFile = req.file;

  if (!titulo || !autor || !imagemFile) {
    return res.status(400).json({ message: 'Título, autor e imagem da capa são obrigatórios.' });
  }

  try {
    // 1. Fazer o upload da imagem para o Supabase Storage
    const nomeFicheiro = `${Date.now()}-${imagemFile.originalname}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('capas_livros') // O nome do seu bucket
      .upload(nomeFicheiro, imagemFile.buffer, {
        contentType: imagemFile.mimetype,
      });

    if (uploadError) {
      console.error('Erro no upload para o Supabase Storage:', uploadError);
      throw new Error('Não foi possível fazer o upload da imagem.');
    }

    // 2. Obter o URL público da imagem que acabámos de enviar
    const { data: urlData } = supabase.storage
      .from('capas_livros')
      .getPublicUrl(nomeFicheiro);

    const imagemUrl = urlData.publicUrl;

    // 3. Inserir os dados do livro, incluindo o URL da imagem, na tabela 'livros'
    const { data: bookData, error: insertError } = await supabase
      .from('livros')
      .insert([
        { titulo, autor, ano, paginas, imagem: imagemUrl }
      ])
      .select();

    if (insertError) {
      console.error('Erro ao inserir livro no Supabase:', insertError.message);
      return res.status(500).json({ message: 'Não foi possível criar o livro.', error: insertError.message });
    }

    res.status(201).json(bookData[0]);

  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.', error: error.message });
  }
};

const getBooks = async (req, res) => {
  // 1. Obtém o termo de pesquisa dos parâmetros do URL (ex: /api/books?search=guerra)
  const { search } = req.query;

  try {
    // Inicia a consulta ao Supabase
    let query = supabase.from('livros').select('*');

    // 2. Se houver um termo de pesquisa, adiciona os filtros
    if (search) {
      // .or() -> procura em qualquer uma das condições seguintes
      // .ilike() -> procura por um texto que contenha o termo de pesquisa, ignorando maiúsculas/minúsculas
      query = query.or(`titulo.ilike.%${search}%,autor.ilike.%${search}%`);
    }

    // 3. Executa a consulta final, ordenando por título
    const { data, error } = await query.order('titulo', { ascending: true });

    if (error) {
      console.error('Erro ao buscar livros no Supabase:', error.message);
      return res.status(500).json({ message: 'Não foi possível buscar os livros.' });
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
  }
};


// 2. BUSCAR UM ÚNICO LIVRO PELO ID
const getBookById = async (req, res) => {
  const { id } = req.params; // Pega o ID do URL (ex: /api/books/123)
  try {
    const { data, error } = await supabase
      .from('livros')
      .select('*')
      .eq('id', id) // .eq() significa "equals" (igual a)
      .single(); // .single() garante que esperamos apenas um resultado

    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Livro não encontrado.' });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar o livro.', error: error.message });
  }
};

// 3. ATUALIZAR UM LIVRO
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, ano, paginas, imagem } = req.body;
  try {
    const { data, error } = await supabase
      .from('livros')
      .update({ titulo, autor, ano, paginas, imagem })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ message: 'Livro não encontrado para atualizar.' });

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o livro.', error: error.message });
  }
};

// 4. APAGAR UM LIVRO
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('livros')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Livro apagado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao apagar o livro.', error: error.message });
  }
};


// Exporta todas as funções
module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};


