import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const bookService = {
  // --- FUNÇÕES JÁ EXISTENTES ---
  async createBook(formData) {
    try {
      const response = await axios.post(`${API_URL}/books`, formData);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Ocorreu um erro ao registar o livro.';
    }
  },

  async getBooks() {
    try {
      const response = await axios.get(`${API_URL}/books`);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Ocorreu um erro ao buscar os livros.';
    }
  },

  // --- NOVAS FUNÇÕES ---

  // Função para ATUALIZAR um livro existente
  async updateBook(bookId, bookData) {
    try {
      // Faz um pedido PUT para o endpoint específico do livro (ex: /api/books/123)
      const response = await axios.put(`${API_URL}/books/${bookId}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Ocorreu um erro ao atualizar o livro.';
    }
  }, // <-- CORRIGIDO: Adicionada a vírgula que faltava aqui

  // Função para APAGAR um livro
  async deleteBook(bookId) {
    try {
      // Faz um pedido DELETE para o endpoint específico do livro
      const response = await axios.delete(`${API_URL}/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Ocorreu um erro ao apagar o livro.';
    }
  }


};
