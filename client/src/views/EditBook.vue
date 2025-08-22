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
              required 
            />
          </div>

          <div class="form-group">
            <label for="paginas">Páginas:</label>
            <input 
              type="number" 
              id="paginas" 
              v-model="form.paginas" 
              required 
            />
          </div>
        </div>

        <!-- CAMPO DE UPLOAD DE IMAGEM -->
        <div class="form-group">
          <label for="imagem">Alterar Capa do Livro (opcional):</label>
          <input 
            type="file" 
            id="imagem" 
            @change="handleFileChange"
            accept="image/png, image/jpeg"
          />
        </div>
        
        <!-- Pré-visualização da imagem -->
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Pré-visualização da capa" />
        </div>

        <button 
          type="submit" 
          class="btn-salvar" 
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'A atualizar...' : 'Atualizar' }}
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

const newImageFile = ref(null); // Para guardar o novo ficheiro da imagem
const imagePreview = ref(''); // Para guardar o URL da pré-visualização
const isLoading = ref(false)
const errors = ref({})

onMounted(async () => {
  const bookId = route.params.id;
  
  if (booksStore.allBooks.length === 0) {
    await booksStore.fetchBooks();
  }

  const bookToEdit = booksStore.getBookById(bookId);
  
  if (bookToEdit) {
    Object.assign(form, bookToEdit);
    imagePreview.value = form.imagem; // Define a pré-visualização inicial
  } else {
    alert('Livro não encontrado. A redirecionar para a biblioteca.');
    router.push({ name: 'Home' });
  }
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newImageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
}

const validateField = (field, value) => {
  const newErrors = { ...errors.value }
  if (!value) newErrors[field] = 'Este campo é obrigatório.'
  else delete newErrors[field]
  errors.value = newErrors
}

const atualizarLivro = async () => {
  validateField('titulo', form.titulo)
  validateField('autor', form.autor)
  
  if (Object.keys(errors.value).length > 0) return
  
  isLoading.value = true
  
  // Cria um FormData para enviar os dados, incluindo o ficheiro (se houver)
  const formData = new FormData();
  formData.append('titulo', form.titulo);
  formData.append('autor', form.autor);
  formData.append('ano', form.ano || 0);
  formData.append('paginas', form.paginas || 0);
  
  // Anexa a imagem apenas se uma nova foi selecionada
  if (newImageFile.value) {
    formData.append('imagem', newImageFile.value);
  } else {
    // Se não houver nova imagem, envia o URL antigo
    formData.append('imagem', form.imagem);
  }

  try {
    await booksStore.updateBook(form.id, formData);
    alert('Livro atualizado com sucesso!');
    router.push({ name: 'InfoBook', params: { id: form.id } });
  } catch (error) {
    errors.value.general = 'Não foi possível atualizar o livro.';
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* O seu CSS foi mantido integralmente */
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
  margin-top: 1rem;
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
