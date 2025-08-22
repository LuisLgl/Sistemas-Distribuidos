<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useBooksStore } from '@/stores/bookStore'
import BookCard from '@/components/books/BookCard.vue'
import BookForm from '@/components/books/BookForm.vue'

const authStore = useAuthStore()
const booksStore = useBooksStore()
const router = useRouter()

// REMOVIDO: A lista de livros não está mais aqui, ela está no store.

const livrosFiltrados = computed(() => {
  const query = booksStore.searchQuery.toLowerCase()
  let filtered = booksStore.livros.filter(livro => // <-- USA A LISTA DO STORE
    livro.titulo.toLowerCase().includes(query) ||
    livro.autor.toLowerCase().includes(query)
  )
  
  if (booksStore.sortOrder === 'asc') {
    filtered = [...filtered].sort((a, b) => a.titulo.localeCompare(b.titulo))
  }
  
  return filtered
})

function salvarLivro(bookData) {
  const novoLivro = {
    ...bookData,
    id: Date.now(),
    imagem: `https://placehold.co/300x450/333/FFF?text=${encodeURIComponent(bookData.titulo)}`
  }
  
  booksStore.addBook(novoLivro)
  
  alert(`Livro "${bookData.titulo}" salvo com sucesso!`)
  authStore.closeAddItemModal()
}

function handleEdit(id) {
  router.push({ name: 'EditBook', params: { id } })
}

function handleDelete(id) {
  if (confirm('Tem certeza que deseja excluir este livro?')) {
    booksStore.deleteBook(id); // <-- CHAMA A FUNÇÃO DO STORE
  }
}
</script>

<template>
  <div class="home-container">
    <h1>Livros Disponíveis</h1>

    <div class="books-grid">
      <BookCard 
        v-for="livro in livrosFiltrados" 
        :key="livro.id" 
        :livro="livro"
        @click="router.push({ name: 'InfoBook', params: { id: livro.id } })"
        @edit="handleEdit"
        @delete="handleDelete"
      />
      <p v-if="livrosFiltrados.length === 0">Nenhum livro encontrado.</p>
    </div>

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
  grid-template-columns: repeat(5, 1fr);
  gap: 2.5rem;
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

p {
  text-align: center;
  font-size: 1.5rem;
  color: #fff;
  width: 100%;
}
</style>