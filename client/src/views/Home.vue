<script setup>
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'
import BookCard from '@/components/BookCard.vue'
import BookForm from '@/components/BookForm.vue' // ← Importe o novo componente

const uiStore = useUiStore()

const livros = ref([
  {
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    paginas: 1200,
    ano: 1954,
    imagem: 'https://placehold.co/300x450/556B2F/FFF?text=O+Senhor+dos+Anéis'
  },
  {
    titulo: '1984',
    autor: 'George Orwell',
    paginas: 328,
    ano: 1949,
    imagem: 'https://placehold.co/300x450/000/FFF?text=1984'
}
])

function salvarLivro(bookData) {
  livros.value.push({
    ...bookData,
    imagem: `https://placehold.co/300x450/333/FFF?text=${bookData.titulo.replace(/ /g, '+')}`
  })
  
  alert(`Livro "${bookData.titulo}" salvo com sucesso!`)
  uiStore.closeAddItemModal()
}
</script>

<template>
  <div class="home-container">
    <h1>Minha Biblioteca</h1>
    <!-- <p>Aqui estarão os seus livros. </p> -->

    <div class="books-grid">
      <BookCard 
        v-for="(livro, index) in livros" 
        :key="index" 
        :livro="livro" 
      />
    </div>

    <!-- Modal com o componente BookForm -->
    <div v-if="uiStore.isAddItemModalVisible" class="modal-overlay" @click="uiStore.closeAddItemModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close-button" @click="uiStore.closeAddItemModal">&times;</button>
        
        <!-- Use o componente BookForm -->
        <BookForm 
          @submit="salvarLivro"
          @cancel="uiStore.closeAddItemModal"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
*{
    box-size: border-box;
    padding: 0;
    margin: 0
}
.home-container {
  padding: 1rem;
  /* justify-content: center; */
}
.home-container h1 {
    margin-bottom: 1rem;
    color: #333;
}
.books-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  /* justify-content: center; */
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  /* padding: 0;  */
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