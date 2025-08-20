<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  titulo: '',
  autor: '',
  paginas: null,
  ano: null
})

const submit = () => {
  emit('submit', { ...form.value })
  // Limpa o formulário após enviar
  form.value = {
    titulo: '',
    autor: '',
    paginas: null,
    ano: null
  }
}

const cancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="book-form">
    <h2>Adicionar Novo Livro</h2>
    
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="titulo">Título: </label>
        <input type="text" id="titulo" v-model="form.titulo" required>
      </div>
      
      <div class="form-group">
        <label for="autor">Autor:</label>
        <input type="text" id="autor" v-model="form.autor" required>
      </div>

      <div class="form-group">
        <label for="paginas">Quantidade de Páginas:</label>
        <input type="number" id="paginas" v-model.number="form.paginas">
      </div>
      
      <div class="form-group">
        <label for="ano">Ano de Publicação:</label>
        <input type="number" id="ano" v-model.number="form.ano">
      </div>
      
      <div class="form-group">
        <label for="img">Capa: </label>
        <p> Colocar um input de imagem aqui.</p>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="cancel" class="cancel-button">Cancelar</button>
        <button type="submit" class="submit-button">Salvar Livro</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.book-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
}

.book-form h2 {
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-button {
  flex: 1;
  padding: 0.75rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #218838;
}

.cancel-button {
  flex: 1;
  padding: 0.75rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #5a6268;
}
</style>