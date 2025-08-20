<template>
  <div class="home-container">
    <h1>Minha Biblioteca</h1>
    <p>Aqui estarão os seus livros.</p>

    <div class="carousel-container">
      <div v-for="(livro, index) in livros" :key="index" class="book-card">
        <img :src="livro.imagem" :alt="'Capa do livro ' + livro.titulo">
        <div class="book-info">
          <h3>{{ livro.titulo }}</h3>
          <p>{{ livro.autor }}</p>
        </div>
      </div>
    </div>
    <div v-if="uiStore.isAddItemModalVisible" class="modal-overlay" @click="uiStore.closeAddItemModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close-button" @click="uiStore.closeAddItemModal">&times;</button>
        
        <h2>Adicionar Novo Livro</h2>
        
        <form @submit.prevent="salvarLivro">
          <div class="form-group">
            <label for="titulo">Título</label>
            <input type="text" id="titulo" v-model="novoLivro.titulo" required>
          </div>
          
          <div class="form-group">
            <label for="autor">Autor</label>
            <input type="text" id="autor" v-model="novoLivro.autor" required>
          </div>

          <div class="form-group">
            <label for="paginas">Quantidade de Páginas</label>
            <input type="number" id="paginas" v-model.number="novoLivro.paginas">
          </div>
          
          <div class="form-group">
            <label for="ano">Ano de Publicação</label>
            <input type="number" id="ano" v-model.number="novoLivro.ano">
          </div>
          
          <button type="submit" class="submit-button">Salvar Livro</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUiStore } from '@/stores/ui'

// 1. Definimos a "forma" de um objeto Livro
//    Dizemos que 'paginas' e 'ano' podem ser um número OU nulos.
interface Livro {
  titulo: string;
  autor: string;
  paginas: number | null;
  ano: number | null;
  imagem: string;
}

const uiStore = useUiStore()

// 2. Aplicamos essa "forma" à nossa lista de livros
const livros = ref<Livro[]>([
  {
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    paginas: 1200,
    ano: 1954,
    imagem: 'https://placehold.co/300x450/556B2F/FFF?text=O+Senhor+dos+Anéis'
  },
  {
    titulo: 'Duna',
    autor: 'Frank Herbert',
    paginas: 688,
    ano: 1965,
    imagem: 'https://placehold.co/300x450/D2B48C/000?text=Duna'
  },
  {
    titulo: '1984',
    autor: 'George Orwell',
    paginas: 328,
    ano: 1949,
    imagem: 'https://placehold.co/300x450/800000/FFF?text=1984'
  }
])

// O objeto do formulário agora corresponde à regra que criamos
const novoLivro = ref({
  titulo: '',
  autor: '',
  paginas: null,
  ano: null
})

function salvarLivro() {
  // Agora não há mais conflito, pois a lista aceita livros com 'paginas: null'
  livros.value.push({
    ...novoLivro.value,
    imagem: `https://placehold.co/300x450/333/FFF?text=${novoLivro.value.titulo.replace(/ /g, '+')}`
  })

  console.log('Salvando novo livro:', novoLivro.value)
  alert(`Livro "${novoLivro.value.titulo}" salvo com sucesso!`)

  novoLivro.value = {
    titulo: '',
    autor: '',
    paginas: null,
    ano: null
  }
  
  uiStore.closeAddItemModal()
}
</script>

<style scoped>
/* Estilos para o container da página */
.home-container {
  padding: 20px;
}

/* Estilos do Pop-up (Modal) e Formulário */
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
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
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
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #218838;
}

/* ================================== */
/* ==== ESTILOS PARA O CARROSSEL ==== */
/* ================================== */
.carousel-container {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 1.5rem 0;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: #ccc #f0f0f0;
}

.carousel-container::-webkit-scrollbar {
  height: 8px;
}
.carousel-container::-webkit-scrollbar-track {
  background: #f0f0f0;
  border-radius: 4px;
}
.carousel-container::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}
.carousel-container::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}

.book-card {
  flex: 0 0 180px; 
  scroll-snap-align: start;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.book-card img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.book-info {
  padding: 1rem;
}

.book-info h3 {
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-info p {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}
</style>