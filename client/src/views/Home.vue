<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useBooksStore } from '@/stores/bookStore'
import BookCard from '@/components/books/BookCard.vue'
import BookForm from '@/components/books/BookForm.vue'

const authStore = useAuthStore()
const booksStore = useBooksStore()
const router = useRouter()

// onMounted é chamado assim que o componente é criado.
// É o local perfeito para ir buscar os dados iniciais.
onMounted(() => {
  // Pede ao store para ir buscar os livros à API.
  booksStore.fetchBooks();
});

function handleEdit(id) {
  // Navega para a página de edição com o ID do livro
  router.push({ name: 'EditBook', params: { id } })
}

async function handleDelete(id) {
  if (confirm('Tem a certeza de que deseja apagar este livro?')) {
    try {
      await booksStore.deleteBook(id);
      alert('Livro apagado com sucesso!');
    } catch (error) {
      alert('Não foi possível apagar o livro.');
    }
  }
}

async function salvarLivro(formData) {
  try {
    await booksStore.addBook(formData);
    alert(`Livro salvo com sucesso!`);
    authStore.closeAddItemModal();
  } catch (error) {
    alert('Não foi possível salvar o livro.');
  }
}
</script>

<template>
  <div class="home-container">
    <h1>Livros Disponíveis</h1>

    <!-- Mostra um estado de carregamento enquanto busca os livros -->
    <div v-if="booksStore.isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>A carregar livros...</p>
    </div>

    <!-- Mostra a grelha de livros ou uma mensagem se estiver vazia -->
    <div v-else>
      <div v-if="booksStore.filteredBooks.length > 0" class="books-grid">
        <BookCard 
          v-for="livro in booksStore.filteredBooks" 
          :key="livro.id" 
          :livro="livro"
          @click="router.push({ name: 'InfoBook', params: { id: livro.id } })"
          @edit="handleEdit(livro.id)"
          @delete="handleDelete(livro.id)"
        />
      </div>
      <p v-else class="empty-message">Nenhum livro encontrado.</p>
    </div>

    <!-- O modal agora usa o 'authStore' -->
    <!-- CORRIGIDO: Adicionadas aspas em @click -->
    <div v-if="authStore.isAddItemModalVisible" class="modal-overlay" @click="authStore.closeAddItemModal">
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
/* O seu CSS anterior foi mantido, com pequenas adições para os estados de carregamento e vazio */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.home-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 8rem;
  padding-bottom: 3rem;
  padding-left: 3rem;
  padding-right: 3rem;
  min-height: 100vh;
}

.home-container h1 {
  margin-bottom: 5rem;
  color: #fff;
  text-align: center;
  font-size: 4rem;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.5rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #fff;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-message {
  text-align: center;
  font-size: 1.5rem;
  color: #fff;
  width: 100%;
  padding: 4rem 0;
}

:deep(.book-card-image) {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

:deep(.book-card-title) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.5rem;
  line-height: 1.25rem;
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
  max-width: 600px;
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
