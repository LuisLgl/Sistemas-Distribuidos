<template>
  <div class="info-page">
    <!-- Mostra um estado de carregamento se o livro ainda não foi encontrado -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>A carregar livro...</p>
    </div>

    <!-- Mostra os detalhes do livro quando encontrado -->
    <div v-else-if="livro" class="info-container">
      <div class="info-header">
        <img :src="livro.imagem" :alt="'Capa do livro ' + livro.titulo" class="book-image" />
        <div class="book-details-info">
          <h1 class="book-title">{{ livro.titulo }}</h1>
          <h2 class="book-author">Por: {{ livro.autor }}</h2>
          <div class="book-meta">
            <span>{{ livro.paginas }} páginas</span>
            <span>•</span>
            <span>Publicado em {{ livro.ano }}</span>
          </div>
          
          <div class="action-buttons">
            <button class="btn btn-edit" @click="handleEdit(livro.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
              Editar
            </button>
            <button class="btn btn-delete" @click="handleDelete(livro.id)" :disabled="isDeleting">
              <span v-if="isDeleting" class="spinner-small"></span>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              {{ isDeleting ? 'A remover...' : 'Remover' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mostra uma mensagem se o livro não for encontrado -->
    <div v-else class="not-found">
      <p>Livro não encontrado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '@/stores/bookStore'

const route = useRoute()
const router = useRouter()
const booksStore = useBooksStore()

const livro = ref(null)
const isLoading = ref(true)
const isDeleting = ref(false) // Novo estado para controlar o processo de remoção

onMounted(async () => {
  const bookId = route.params.id;
  // Se os livros ainda não foram carregados, vai buscá-los primeiro
  if (booksStore.allBooks.length === 0) {
    await booksStore.fetchBooks();
  }
  // Agora, com a lista carregada, encontra o livro
  livro.value = booksStore.getBookById(bookId);
  isLoading.value = false;
});

function handleEdit(id) {
  router.push({ name: 'EditBook', params: { id } })
}

// A função de apagar agora tem um feedback visual de carregamento
async function handleDelete(id) {
  if (confirm('Tem a certeza de que deseja apagar este livro?')) {
    isDeleting.value = true; // Ativa o estado de carregamento
    try {
      await booksStore.deleteBook(id);
      alert('Livro apagado com sucesso!');
      router.push({ name: 'Home' }); // Redireciona para a página principal
    } catch (error) {
      alert('Não foi possível apagar o livro.');
    } finally {
      isDeleting.value = false; // Desativa o estado de carregamento
    }
  }
}
</script>

<style scoped>
.info-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 8rem 2rem 3rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.info-container {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  max-width: 900px;
  width: 100%;
}

.info-header {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.book-image {
  width: 250px;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.book-details-info {
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 1.5rem;
}

.book-title {
  font-size: 2.25rem;
  color: #333;
  margin-bottom: 0;
  line-height: 1.2;
}

.book-author {
  font-size: 1.25rem;
  color: #666;
  font-style: italic;
  margin-top: -1rem;
}

.book-meta {
  display: flex;
  gap: 1rem;
  color: #888;
  font-size: 0.9rem;
}

.action-buttons {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}
.btn-edit {
  background-color: #42b983;
  color: white;
}
.btn-edit:hover {
  background-color: #36976e;
}
.btn-delete {
  background-color: #e74c3c;
  color: white;
}
.btn-delete:hover {
  background-color: #c0392b;
}

.not-found, .loading-state {
  text-align: center;
  color: white;
  font-size: 2rem;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.spinner-small {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* --- Media Query para Responsividade --- */
@media (max-width: 768px) {
  .info-header {
    flex-direction: column;
    text-align: center;
  }
  .book-details-info {
    text-align: center;
    align-items: center;
  }
  .book-image {
    width: 200px;
    height: 300px;
  }
  .book-title {
    font-size: 1.75rem;
  }
  .book-author {
    font-size: 1.1rem;
  }
}
</style>
