<template>
  <div class="cadastro-page">
    <div class="cadastro-container">
      <h1>Editar Livro</h1>
      
      <div v-if="errors.general" class="error-message general-error">
        {{ errors.general }}
      </div>

      <form @submit.prevent="atualizarLivro" novalidate>
        <div class="form-row">
          <div class="form-group">
            <label for="titulo">Nome do Livro:</label>
            <input 
              type="text" 
              id="titulo" 
              v-model="form.titulo" 
              :class="{ 'error': errors.titulo }"
              @blur="validateField('titulo', form.titulo)"
              @input="clearError('titulo')"
              required 
            />
            <span v-if="errors.titulo" class="error-message">{{ errors.titulo }}</span>
          </div>

          <div class="form-group">
            <label for="autor">Autor:</label>
            <input 
              type="text" 
              id="autor" 
              v-model="form.autor" 
              :class="{ 'error': errors.autor }"
              @blur="validateField('autor', form.autor)"
              @input="clearError('autor')"
              required 
            />
            <span v-if="errors.autor" class="error-message">{{ errors.autor }}</span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="ano">Ano de Publicação:</label>
            <input 
              type="number" 
              id="ano" 
              v-model="form.ano" 
              :class="{ 'error': errors.ano }"
              @blur="validateField('ano', form.ano)"
              @input="clearError('ano')"
              required 
            />
            <span v-if="errors.ano" class="error-message">{{ errors.ano }}</span>
          </div>

          <div class="form-group">
            <label for="paginas">Páginas:</label>
            <input 
              type="number" 
              id="paginas" 
              v-model="form.paginas" 
              :class="{ 'error': errors.paginas }"
              @blur="validateField('paginas', form.paginas)"
              @input="clearError('paginas')"
              required 
            />
            <span v-if="errors.paginas" class="error-message">{{ errors.paginas }}</span>
          </div>
        </div>

        <button 
          type="submit" 
          class="btn-salvar" 
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'Atualizando...' : 'Atualizar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBooksStore } from '@/stores/bookStore'

const router = useRouter()
const route = useRoute()
const booksStore = useBooksStore()

const form = reactive({
  id: null,
  titulo: '',
  autor: '',
  ano: null,
  paginas: null,
  imagem: '',
})

const isLoading = ref(false)
const errors = ref({})

onMounted(() => {
  const bookId = Number(route.params.id)
  const bookToEdit = booksStore.getBookById(bookId)
  
  if (bookToEdit) {
    Object.assign(form, bookToEdit)
  } else {
    router.push({ name: 'Home' })
  }
})

const validateField = (field, value) => {
  const newErrors = { ...errors.value }
  
  switch (field) {
    case 'titulo':
      if (!value) newErrors.titulo = 'Nome do livro é obrigatório.'
      else delete newErrors.titulo
      break
    case 'autor':
      if (!value) newErrors.autor = 'Autor é obrigatório.'
      else delete newErrors.autor
      break
    case 'ano':
      if (!value || value <= 0) newErrors.ano = 'Ano de publicação deve ser um número válido.'
      else delete newErrors.ano
      break
    case 'paginas':
      if (!value || value <= 0) newErrors.paginas = 'Número de páginas deve ser um número válido.'
      else delete newErrors.paginas
      break
  }
  
  errors.value = newErrors
}

const atualizarLivro = () => {
  errors.value = {}
  validateField('titulo', form.titulo)
  validateField('autor', form.autor)
  validateField('ano', form.ano)
  validateField('paginas', form.paginas)
  
  if (Object.keys(errors.value).length > 0) {
    return
  }
  
  isLoading.value = true
  
  setTimeout(() => {
    booksStore.updateBook({ ...form })
    alert('Livro atualizado com sucesso!')
    isLoading.value = false
    router.push({ name: 'Home' })
  }, 1000)
}

const clearError = (field) => {
  if (errors.value[field]) {
    const newErrors = { ...errors.value }
    delete newErrors[field]
    errors.value = newErrors
  }
}
</script>

<style scoped>
.cadastro-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  overflow: hidden;
}

.cadastro-container {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 600px;
  text-align: center;
  box-sizing: border-box;
}

h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  font-weight: 600;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex: 1;
  flex-direction: column;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

input.error {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
}

input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: block;
}

.general-error {
  background: #ffeaea;
  color: #c0392b;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 1px solid #f8d7da;
}

.btn-salvar {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #42b983, #36976e);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-salvar:hover:not(:disabled) {
  background: linear-gradient(135deg, #36976e, #2d7a5a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.btn-salvar:disabled {
  background: #95a5a6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 0.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>