<template>
  <div class="cadastro-page">
    <div class="cadastro-container">
      <h1>Crie a sua Conta</h1>

      <!-- Mensagem de erro geral vinda do backend -->
      <div v-if="errors.general" class="error-message general-error">
        {{ errors.general }}
      </div>

      <form @submit.prevent="cadastrarUsuario" novalidate>
        <div class="form-group">
          <label for="nome">Nome Completo:</label>
          <input 
            type="text" 
            id="nome" 
            v-model="form.nome" 
            :class="{ 'error': errors.nome }"
            @blur="validateField('nome', form.nome)"
            @input="clearError('nome')"
            required 
          />
          <span v-if="errors.nome" class="error-message">{{ errors.nome }}</span>
        </div>

        <div class="form-group">
          <label for="email">E-mail:</label>
          <input 
            type="email" 
            id="email" 
            v-model="form.email" 
            :class="{ 'error': errors.email }"
            @blur="validateField('email', form.email)"
            @input="clearError('email')"
            required 
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="senha">Palavra-passe:</label>
          <input 
            type="password" 
            id="senha" 
            v-model="form.senha" 
            :class="{ 'error': errors.senha }"
            @blur="validateField('senha', form.senha)"
            @input="clearError('senha')"
            required 
          />
          <span v-if="errors.senha" class="error-message">{{ errors.senha }}</span>
        </div>

        <button 
          type="submit" 
          class="btn-cadastrar" 
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'Confirme seu email' : 'Registar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/authService' // Importa o nosso serviço de autenticação

const router = useRouter()

const form = reactive({
  nome: '',
  email: '',
  senha: '',
})

const isLoading = ref(false)
const errors = ref({})

const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(form.email)
})

const validateField = (field, value) => {
  const newErrors = { ...errors.value }
  
  switch (field) {
    case 'nome':
      if (!value) newErrors.nome = 'O nome é obrigatório.'
      else delete newErrors.nome
      break
    case 'email':
      if (!value) newErrors.email = 'O e-mail é obrigatório.'
      else if (!isValidEmail.value) newErrors.email = 'O e-mail deve ter um formato válido.'
      else delete newErrors.email
      break
    case 'senha':
      if (!value) newErrors.senha = 'A palavra-passe é obrigatória.'
      else if (value.length < 6) newErrors.senha = 'A palavra-passe deve ter pelo menos 6 caracteres.'
      else delete newErrors.senha
      break
  }
  
  errors.value = newErrors
}

// Função de registo atualizada para usar o authService
const cadastrarUsuario = async () => {
  clearError('general');
  validateField('nome', form.nome)
  validateField('email', form.email)
  validateField('senha', form.senha)
  
  if (Object.keys(errors.value).length > 0) {
    return
  }
  
  isLoading.value = true
  
  try {
    // Chama a função 'register' do nosso serviço de autenticação
    const response = await authService.register(form.nome, form.email, form.senha);

    console.log('Registo bem-sucedido:', response);
    alert('Conta criada com sucesso! Verifique o seu e-mail para confirmar antes de fazer login.');
    router.push({ name: 'Login' }); // Redireciona para a página de login

  } catch (error) {
    // Mostra o erro vindo do backend
    errors.value.general = error;
  } finally {
    isLoading.value = false;
  }
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
/* O seu CSS anterior foi mantido, pois já está ótimo */
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
  max-width: 400px;
  text-align: center;
  box-sizing: border-box;
}

h1 {
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
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

.btn-cadastrar {
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

.btn-cadastrar:hover:not(:disabled) {
  background: linear-gradient(135deg, #36976e, #2d7a5a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.btn-cadastrar:disabled {
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
