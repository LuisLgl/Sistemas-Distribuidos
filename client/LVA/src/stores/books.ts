import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Livro {
  titulo: string;
  autor: string;
  paginas: number | null;
  ano: number | null;
  imagem: string;
}

export const useBookStore = defineStore('books', () => {
  // --- STATE (O ESTADO) ---
  const livros = ref<Livro[]>([
    { titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', paginas: 1200, ano: 1954, imagem: 'https://placehold.co/300x450/556B2F/FFF?text=O+Senhor+dos+Anéis' },
    { titulo: 'Duna', autor: 'Frank Herbert', paginas: 688, ano: 1965, imagem: 'https://placehold.co/300x450/D2B48C/000?text=Duna' },
    { titulo: '1984', autor: 'George Orwell', paginas: 328, ano: 1949, imagem: 'https://placehold.co/300x450/800000/FFF?text=1984' }
  ]);
  
  const searchTerm = ref('');

  // --- GETTERS (DADOS COMPUTADOS) ---
  const filteredBooks = computed(() => {
    if (!searchTerm.value) {
      return livros.value;
    }
    const lowerCaseSearch = searchTerm.value.toLowerCase();
    return livros.value.filter(livro => 
      livro.titulo.toLowerCase().includes(lowerCaseSearch) ||
      livro.autor.toLowerCase().includes(lowerCaseSearch)
    );
  });

  // --- ACTIONS (AS AÇÕES) ---
  function adicionarLivro(novoLivro: Omit<Livro, 'imagem'>) {
    livros.value.push({
      ...novoLivro,
      imagem: `https://placehold.co/300x450/333/FFF?text=${novoLivro.titulo.replace(/ /g, '+')}`
    });
  }

  function atualizarLivro(index: number, dadosDoLivro: Livro) {
    if (livros.value[index]) {
      livros.value[index] = dadosDoLivro;
    }
  }

  function removerLivro(index: number) {
    livros.value.splice(index, 1);
  }

  return { livros, searchTerm, filteredBooks, adicionarLivro, atualizarLivro, removerLivro };
})