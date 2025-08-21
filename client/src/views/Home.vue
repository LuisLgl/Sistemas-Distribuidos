<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore' // MELHORIA: Nome do arquivo mais consistente
import BookCard from '@/components/books/BookCard.vue' // CORRIGIDO: Caminho do import
import BookForm from '@/components/books/BookForm.vue' // CORRIGIDO: Caminho do import

const authStore = useAuthStore()

const livros = ref([
  {
    id: 1, // MELHORIA: Adicionado ID único
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    paginas: 1200,
    ano: 1954,
    imagem: 'https://placehold.co/300x450/556B2F/FFF?text=O+Senhor+dos+Anéis'
  },
  {
    id: 2, // MELHORIA: Adicionado ID único
    titulo: '1984',
    autor: 'George Orwell',
    paginas: 328,
    ano: 1949,
    imagem: 'https://placehold.co/300x450/000/FFF?text=1984'
  }
])

function salvarLivro(bookData) {
  const novoLivro = {
    ...bookData,
    id: Date.now(), // MELHORIA: Gerando um ID único para o novo livro
    imagem: `https://placehold.co/300x450/333/FFF?text=${encodeURIComponent(bookData.titulo)}` // MELHORIA: Usando encodeURIComponent para tratar caracteres especiais
  }
  
  livros.value.push(novoLivro)
  
  // MELHORIA: Usar alert() não é ideal, mas mantendo sua lógica por enquanto.
  // Uma notificação "toast" seria uma experiência de usuário melhor.
  alert(`Livro "${bookData.titulo}" salvo com sucesso!`)
  authStore.closeAddItemModal()
}
</script>

<template>
  <div class="home-container">
    <h1>Minha Biblioteca</h1>

    <div class="books-grid">
      <BookCard 
        v-for="livro in livros" 
        :key="livro.id"  
        :livro="livro" 
      /> </div>

    <div v-if="authStore.isAddItemModalVisible" class="modal-overlay" @click="uiStore.closeAddItemModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close-button" @click="authStore.closeAddItemModal">&times;</button>
        
        <BookForm 
          @submit="salvarLivro"
          @cancel="authStore.closeAddItemModal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* NOTA: O ideal é que resets globais como este fiquem em um arquivo CSS principal 
  (ex: src/assets/styles/main.css) e não dentro de um componente com 'scoped'.
*/
* {
  box-sizing: border-box; /* CORRIGIDO: Erro de digitação de "box-sizing" */
  padding: 0;
  margin: 0;
}

.home-container {
  padding: 2rem;
}

.home-container h1 {
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
  font-size: 2.5rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #888;
  z-index: 1001;
}

.modal-close-button:hover {
  color: #333;
}
</style>