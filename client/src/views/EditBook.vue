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

        <div class="form-group">
          <label for="imagem">Alterar Capa do Livro (Opcional):</label>
          <input 
            type="file" 
            id="imagem"
            @change="handleFileChange"
            accept="image/png, image/jpeg"
          />
        </div>

        <!-- Pré-visualização da imagem -->
        <div v-if="imagePreview" class="image-preview">
          <p>Pré-visualização:</p>
          <img :src="imagePreview" alt="Pré-visualização da capa" />
        </div>

        <button type="submit" class="btn-salvar" :disabled="isLoading">
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'A atualizar...' : 'Atualizar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useBooksStore } from '@/stores/bookStore';

const router = useRouter();
const route = useRoute();
const booksStore = useBooksStore();

const form = reactive({
  id: null,
  titulo: '',
  autor: '',
  ano: null,
  paginas: null,
  imagem: '',
});
const newImageFile = ref(null);
const imagePreview = ref('');
const isLoading = ref(false);
const errors = ref({});

onMounted(async () => {
  const bookId = route.params.id;
  if (booksStore.allBooks.length === 0) {
    await booksStore.fetchBooks();
  }
  const bookToEdit = booksStore.getBookById(bookId);
  if (bookToEdit) {
    Object.assign(form, bookToEdit);
    imagePreview.value = bookToEdit.imagem; // Mostra a imagem atual
  } else {
    router.push({ name: 'Home' });
  }
});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    newImageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  }
};

const validateField = (field, value) => {
  const newErrors = { ...errors.value };
  if (!value) {
    newErrors[field] = 'Este campo é obrigatório.';
  } else {
    delete newErrors[field];
  }
  errors.value = newErrors;
};

const atualizarLivro = async () => {
  errors.value = {};
  validateField('titulo', form.titulo);
  validateField('autor', form.autor);

  if (Object.keys(errors.value).length > 0) {
    return;
  }

  isLoading.value = true;
  
  const formData = new FormData();
  formData.append('titulo', form.titulo);
  formData.append('autor', form.autor);
  formData.append('ano', form.ano || 0);
  formData.append('paginas', form.paginas || 0);
  
  if (newImageFile.value) {
    formData.append('imagem', newImageFile.value);
  } else {
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
};
</script>

<style scoped>
/* Estilos base (consistentes com as outras páginas) */
/* Estilos base (consistentes com as outras páginas) */
.cadastro-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 7rem;
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

/* CORREÇÃO E MELHORIA DO ESTILO DA PRÉ-VISUALIZAÇÃO DA IMAGEM */
.image-preview {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 2px dashed #e1e5e9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.image-preview p {
  font-weight: 600;
  color: #555;
  margin: 0;
}
.image-preview img {
  max-width: 100%; /* Garante que a imagem não ultrapasse o container */
  max-height: 200px; /* Limita a altura máxima */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  object-fit: cover;
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
