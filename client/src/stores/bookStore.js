import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { bookService } from '@/services/bookService';

export const useBooksStore = defineStore('books', () => {
  // --- STATE ---
  const allBooks = ref([]);
  const searchQuery = ref('');
  const isLoading = ref(false);
  const sortOrder = ref('asc'); // 'asc' ou 'desc'

  // --- GETTERS (Computed Properties) ---
  // A "inteligência" do store: filtra e ordena os livros automaticamente.
  const filteredBooks = computed(() => {
    let books = [...allBooks.value]; // Cria uma cópia para não modificar o original

    // 1. Filtragem
    if (searchQuery.value) {
      const lowerCaseQuery = searchQuery.value.toLowerCase();
      books = books.filter(book => 
        book.titulo.toLowerCase().includes(lowerCaseQuery) ||
        book.autor.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // 2. Ordenação
    if (sortOrder.value === 'asc') {
      books.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else {
      books.sort((a, b) => b.titulo.localeCompare(a.titulo));
    }

    return books;
  });

  // Função para encontrar um livro por ID na lista já carregada
  const getBookById = (id) => {
    return allBooks.value.find(book => book.id === id);
  };

  // --- ACTIONS ---
  const fetchBooks = async () => {
    isLoading.value = true;
    try {
      const booksData = await bookService.getBooks();
      allBooks.value = booksData || [];
    } catch (error) {
      console.error("Erro ao buscar livros no store:", error);
      allBooks.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  const addBook = async (bookData) => {
    try {
      // Chama o serviço para criar o livro no backend
      const newBook = await bookService.createBook(bookData);
      // Adiciona o novo livro à lista local para atualização instantânea
      allBooks.value.push(newBook);
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      // Lançar o erro para que o componente possa tratá-lo
      throw error;
    }
  };

  // ADICIONADO: Ação para atualizar um livro
  const updateBook = async (bookId, bookData) => {
    try {
      const updatedBook = await bookService.updateBook(bookId, bookData);
      // Encontra o índice do livro a ser atualizado
      const index = allBooks.value.findIndex(book => book.id === bookId);
      if (index !== -1) {
        // Substitui o livro antigo pelo livro atualizado na lista local
        allBooks.value[index] = updatedBook;
      }
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
      throw error;
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      // Remove o livro da lista local
      allBooks.value = allBooks.value.filter(book => book.id !== bookId);
    } catch (error) {
      console.error("Erro ao apagar livro:", error);
      throw error;
    }
  };
  
  return {
    allBooks,
    searchQuery,
    isLoading,
    sortOrder,
    filteredBooks,
    fetchBooks,
    setSearchQuery,
    addBook,
    updateBook, // <-- Exporta a nova função
    deleteBook,
    getBookById,
  };
});
