<template>
  <div class="home-container">
    <h1>Minha Biblioteca</h1>
    <p>Aqui estarão os seus livros.</p>

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

const uiStore = useUiStore()

// Objeto reativo para guardar as informações do formulário
const novoLivro = ref({
  titulo: '',
  autor: '',
  paginas: null,
  ano: null
})

function salvarLivro() {
  // Aqui você enviaria os dados para um backend/API
  console.log('Salvando novo livro:', novoLivro.value)
  alert(`Livro "${novoLivro.value.titulo}" salvo com sucesso!`)

  // Limpa o formulário
  novoLivro.value = {
    titulo: '',
    autor: '',
    paginas: null,
    ano: null
  }
  
  // Fecha o pop-up usando a ação da store
  uiStore.closeAddItemModal()
}
</script>

<style scoped>
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
</style>