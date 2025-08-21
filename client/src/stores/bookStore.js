import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBooksStore = defineStore('books', () => {
  const searchQuery = ref('')
  const sortOrder = ref(null)
  
  // Lista de livros agora vive no store
  const livros = ref([
    {
      id: 1,
      titulo: 'O Hobbit',
      autor: 'J.R.R. Tolkien',
      paginas: 310,
      ano: 1937,
      imagem: 'https://placehold.co/300x450/4B2C1A/FFF?text=O+Hobbit'
    },
    {
      id: 2,
      titulo: 'O Apanhador no Campo de Centeio',
      autor: 'J.D. Salinger',
      paginas: 224,
      ano: 1951,
      imagem: 'https://placehold.co/300x450/708090/FFF?text=O+Apanhador'
    },
    {
      id: 3,
      titulo: 'A Revolução dos Bichos',
      autor: 'George Orwell',
      paginas: 112,
      ano: 1945,
      imagem: 'https://placehold.co/300x450/A52A2A/FFF?text=A+Revolução'
    },
    {
      id: 4,
      titulo: 'Cem Anos de Solidão',
      autor: 'Gabriel García Márquez',
      paginas: 417,
      ano: 1967,
      imagem: 'https://placehold.co/300x450/B8860B/FFF?text=Cem+Anos'
    },
    {
      id: 5,
      titulo: 'O Estrangeiro',
      autor: 'Albert Camus',
      paginas: 123,
      ano: 1942,
      imagem: 'https://placehold.co/300x450/4682B4/FFF?text=O+Estrangeiro'
    },
    {
      id: 6,
      titulo: 'Crime e Castigo',
      autor: 'Fiódor Dostoiévski',
      paginas: 671,
      ano: 1866,
      imagem: 'https://placehold.co/300x450/800000/FFF?text=Crime+e+Castigo'
    },
    {
      id: 7,
      titulo: 'O Pequeno Príncipe',
      autor: 'Antoine de Saint-Exupéry',
      paginas: 96,
      ano: 1943,
      imagem: 'https://placehold.co/300x450/F08080/FFF?text=O+Pequeno+Príncipe'
    },
    {
      id: 8,
      titulo: 'A Menina que Roubava Livros',
      autor: 'Markus Zusak',
      paginas: 552,
      ano: 2005,
      imagem: 'https://placehold.co/300x450/DDA0DD/FFF?text=A+Menina'
    },
    {
      id: 9,
      titulo: 'Admirável Mundo Novo',
      autor: 'Aldous Huxley',
      paginas: 311,
      ano: 1932,
      imagem: 'https://placehold.co/300x450/87CEEB/333?text=Admirável+Mundo'
    },
    {
      id: 10,
      titulo: 'O Sol é Para Todos',
      autor: 'Harper Lee',
      paginas: 324,
      ano: 1960,
      imagem: 'https://placehold.co/300x450/F5F5DC/333?text=O+Sol+é+Para+Todos'
    },
    {
      id: 11,
      titulo: 'O Grande Gatsby',
      autor: 'F. Scott Fitzgerald',
      paginas: 180,
      ano: 1925,
      imagem: 'https://placehold.co/300x450/FFD700/333?text=O+Grande+Gatsby'
    },
    {
      id: 12,
      titulo: 'A Arte da Guerra',
      autor: 'Sun Tzu',
      paginas: 273,
      ano: 1999, // Ano alterado para um valor moderno
      imagem: 'https://placehold.co/300x450/2F4F4F/FFF?text=A+Arte+da+Guerra'
    },
    {
      id: 13,
      titulo: 'O Morro dos Ventos Uivantes',
      autor: 'Emily Brontë',
      paginas: 416,
      ano: 1847,
      imagem: 'https://placehold.co/300x450/9932CC/FFF?text=O+Morro+dos+Ventos'
    },
    {
      id: 14,
      titulo: 'Drácula',
      autor: 'Bram Stoker',
      paginas: 418,
      ano: 1897,
      imagem: 'https://placehold.co/300x450/800000/FFF?text=Drácula'
    },
    {
      id: 15,
      titulo: 'E Não Sobrou Nenhum',
      autor: 'Agatha Christie',
      paginas: 252,
      ano: 1939,
      imagem: 'https://placehold.co/300x450/4B0082/FFF?text=E+Não+Sobrou+Nenhum'
    },
    {
      id: 16,
      titulo: 'O Retrato de Dorian Gray',
      autor: 'Oscar Wilde',
      paginas: 254,
      ano: 1890,
      imagem: 'https://placehold.co/300x450/2E8B57/FFF?text=O+Retrato'
    },
    {
      id: 17,
      titulo: 'O Nome da Rosa',
      autor: 'Umberto Eco',
      paginas: 502,
      ano: 1980,
      imagem: 'https://placehold.co/300x450/BDB76B/333?text=O+Nome+da+Rosa'
    },
    {
      id: 18,
      titulo: 'O Ladrão de Raios',
      autor: 'Rick Riordan',
      paginas: 400,
      ano: 2005,
      imagem: 'https://placehold.co/300x450/FFA07A/FFF?text=O+Ladrão+de+Raios'
    },
    {
      id: 19,
      titulo: 'A Guerra dos Tronos',
      autor: 'George R.R. Martin',
      paginas: 694,
      ano: 1996,
      imagem: 'https://placehold.co/300x450/663399/FFF?text=A+Guerra+dos+Trons'
    },
    {
      id: 20,
      titulo: 'Fahrenheit 451',
      autor: 'Ray Bradbury',
      paginas: 158,
      ano: 1953,
      imagem: 'https://placehold.co/300x450/FF8C00/FFF?text=Fahrenheit+451'
    }
]);

  function getBookById(id) {
    return livros.value.find(livro => livro.id === id)
  }

  function addBook(newBook) {
    livros.value.push(newBook)
  }

  function updateBook(updatedBook) {
    const index = livros.value.findIndex(livro => livro.id === updatedBook.id)
    if (index !== -1) {
      livros.value[index] = updatedBook
    }
  }

  function setSearchQuery(query) {
    searchQuery.value = query
  }
  
  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? null : 'asc';
  }

  return { 
    livros, 
    searchQuery, 
    sortOrder, 
    getBookById, 
    addBook, 
    updateBook,
    setSearchQuery, 
    toggleSortOrder 
  }
})