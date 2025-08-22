<template>
  <div class="info-page">
    <div v-if="livro" class="info-container">
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
            <button class="btn btn-delete" @click="handleDelete(livro.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
              Remover
            </button>
          </div>
        </div>
      </div>
    </div>
    
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

onMounted(() => {
  const bookId = Number(route.params.id)
  livro.value = booksStore.getBookById(bookId)
})

function handleEdit(id) {
  router.push({ name: 'EditBook', params: { id } })
}

function handleDelete(id) {
  if (confirm('Tem certeza que deseja excluir este livro?')) {
    booksStore.deleteBook(id)
    router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
.info-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 8rem 3rem 3rem 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.info-container {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 3rem;
  max-width: 800px;
  width: 100%;
}

.info-header {
  display: flex;
  gap: 3rem; /* <-- ESPAÇO ENTRE IMAGEM E INFO DIMINUÍDO */
  align-items: center;
}

.book-image {
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
}

.book-details-info {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 2.5rem; /* <-- CORRIGIDO A SINTAXE E AUMENTADO O ESPAÇAMENTO */
}

.book-title {
  font-size: 2rem; /* <-- TAMANHO DA FONTE DIMINUÍDO */
  color: #333;
  margin-bottom: 0;
}

.book-author {
  font-size: 1.5rem;
  color: #666;
  font-style: italic;
  margin-bottom: 0;
}

.book-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: #888;
  font-size: 1rem;
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
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
  gap: 0.5rem;
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

.not-found {
  text-align: center;
  color: white;
  font-size: 2rem;
  margin-top: 10rem;
}
</style>