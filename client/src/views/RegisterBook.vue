<template>
  <div class="cadastro-page">
    <div class="cadastro-container">
      <h1>Registar Livro</h1>

      <div v-if="errors.general" class="error-message general-error">
        {{ errors.general }}
      </div>

      <form @submit.prevent="salvarLivro" novalidate>
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
              :class="{ 'error': errors.ano }"
              @blur="validateField('ano', form.ano)"
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
              required 
            />
            <span v-if="errors.paginas" class="error-message">{{ errors.paginas }}</span>
          </div>
        </div>

        <!-- CAMPO DE UPLOAD DE IMAGEM -->
        <div class="form-group">
          <label for="imagem">Capa do livro:</label>
          <input 
            type="file" 
            id="imagem" 
            @change="handleFileChange"
            :class="{ 'error': errors.imagem }"
            accept="image/png, image/jpeg"
            required 
          />
          <span v-if="errors.imagem" class="error-message">{{ errors.imagem }}</span>
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
          {{ isLoading ? 'A guardar...' : 'Adicionar Livro' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { bookService } from '@/services/bookService' // Importa o novo serviço

const router = useRouter()

const form = reactive({
  titulo: '',
  autor: '',
  ano: null,
  paginas: null,
})

const imagemFile = ref(null); // Para guardar o ficheiro da imagem
const imagePreview = ref(''); // Para guardar o URL da pré-visualização
const isLoading = ref(false)
const errors = ref({})

// Função para capturar o ficheiro selecionado
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imagemFile.value = file;
    // Cria um URL local para a pré-visualização da imagem
    imagePreview.value = URL.createObjectURL(file);
    validateField('imagem', file);
  }
}

const validateField = (field, value) => {
  const newErrors = { ...errors.value }
  
  switch (field) {
    case 'titulo':
      if (!value) newErrors.titulo = 'O nome do livro é obrigatório.'
      else delete newErrors.titulo
      break
    case 'autor':
      if (!value) newErrors.autor = 'O autor é obrigatório.'
      else delete newErrors.autor
      break
    case 'imagem':
      if (!value) newErrors.imagem = 'A imagem da capa é obrigatória.'
      else delete newErrors.imagem
      break
    // Adicione outras validações se necessário
  }
  
  errors.value = newErrors
}

const salvarLivro = async () => {
  errors.value = {}
  validateField('titulo', form.titulo)
  validateField('autor', form.autor)
  validateField('imagem', imagemFile.value)
  
  if (Object.keys(errors.value).length > 0) {
    return
  }
  
  isLoading.value = true
  
  // Cria um objeto FormData para enviar os dados, incluindo o ficheiro
  const formData = new FormData();
  formData.append('titulo', form.titulo);
  formData.append('autor', form.autor);
  formData.append('ano', form.ano || 0);
  formData.append('paginas', form.paginas || 0);
  formData.append('imagem', imagemFile.value); // Anexa o ficheiro

  try {
    await bookService.createBook(formData);
    alert('Livro registado com sucesso!');
    router.push({ name: 'Home' }); // Redireciona para a página principal
  } catch (error) {
    errors.value.general = error;
  } finally {
    isLoading.value = false;
  }
}
</script>


<style scoped>
/* O seu CSS anterior foi mantido, com a adição de estilos para a pré-visualização */
.cadastro-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.cadastro-container {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 600px;
  text-align: center;
}

h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
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

input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input[type="file"] {
  padding: 0.75rem;
}

input.error {
  border-color: #e74c3c;
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.image-preview {
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}
.image-preview img {
  max-width: 150px;
  max-height: 225px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
  margin-top: 1rem;
}
</style>
