<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Login</h1>

      <!-- Erro geral vindo do authService -->
      <div v-if="errors.general" class="error-message general-error">
        {{ errors.general }}
      </div>

      <!-- Formulário -->
      <form @submit.prevent="handleLogin" novalidate>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            :class="{ 'error': errors.email }"
            @blur="validateField('email', email)"
            @input="clearError('email')"
            required 
            autocomplete="email"
          />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            :class="{ 'error': errors.password }"
            @blur="validateField('password', password)"
            @input="clearError('password')"
            required 
            autocomplete="current-password"
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>

        <button 
          type="submit" 
          class="btn-login"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="spinner"></span>
          {{ isLoading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <!-- Links extras -->
      
    </div>

    <!-- Modal de Cadastro -->
    <Transition name="modal-fade">
      <div v-if="isModalVisible" class="modal-overlay" @click="fecharModal">
        <div class="modal-content" @click.stop>
          <button class="close-button" @click="fecharModal">&times;</button>
          <h2>Crie sua Conta</h2>
          <p style="text-align: center; padding: 20px;">O formulário de cadastro apareceria aqui.</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore' // <-- PASSO 1: Importar o Auth Store
import { authService } from '@/services/authService'

// --- Estado do Formulário e Validação ---
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errors = ref({})

const router = useRouter()
const authStore = useAuthStore() // <-- PASSO 2: Criar uma instância do store

// Validações (seu código, excelente!)
const isValidEmail = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value)
})

const validateField = (field, value) => {
  const newErrors = { ...errors.value }
  
  switch (field) {
    case 'email':
      if (!value) newErrors.email = 'E-mail é obrigatório'
      else if (!isValidEmail.value) newErrors.email = 'E-mail deve ter um formato válido'
      else delete newErrors.email
      break
    case 'password':
      if (!value) newErrors.password = 'Senha é obrigatória'
      else if (value.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
      else delete newErrors.password
      break
  }
  
  errors.value = newErrors
}

const handleLogin = async () => {
  clearError('general')
  validateField('email', email.value)
  validateField('password', password.value)
  
  if (Object.keys(errors.value).length > 0) {
    return
  }

  isLoading.value = true
  
  try {
    // Chama nosso backend de mentirinha
    const response = await authService.login(email.value, password.value)
    
    // <-- PASSO 3: Lógica de sucesso integrada
    console.log('Login realizado com sucesso:', response)
    authStore.login(response.user) // Avisa a aplicação inteira que o login foi feito
    router.push({ name: 'Home' }) // Redireciona para a página Home

  } catch (error) {
    console.error('Erro no login:', error)
    errors.value.general = typeof error === 'string' ? error : 'Credenciais inválidas. Tente novamente.'
  } finally {
    isLoading.value = false
  }
}

const clearError = (field) => {
  if (errors.value[field]) {
    const newErrors = { ...errors.value }
    delete newErrors[field]
    errors.value = newErrors
  }
}

// --- Lógica do Modal ---
const isModalVisible = ref(false)
const abrirModal = () => { isModalVisible.value = true }
const fecharModal = () => { isModalVisible.value = false }
</script>

<style scoped>
/* Seu CSS está ótimo, pode mantê-lo como está. Apenas um ajuste nos links. */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
  overflow: hidden; /* previne scroll */
} 

.login-container {
  background: white;
  padding: 2.5rem 2rem; /* ajuste leve no padding horizontal */
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

input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

input.error {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
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

.btn-login {
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

.btn-login:hover:not(:disabled) {
  background: linear-gradient(135deg, #36976e, #2d7a5a);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.3);
}

.btn-login:disabled {
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

.login-links {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center; /* centraliza o botão */
  gap: 1rem;
}

/* AJUSTE: Aplicando o mesmo estilo para 'a' e 'button' */
.login-links a, .login-links button {
  font-size: 0.9rem;
  color: #42b983;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.login-links a:hover, .login-links button:hover {
  color: #36976e;
  text-decoration: underline;
}

/* Modal (reutilizado de antes) */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-content { background-color: white; padding: 30px; border-radius: 12px; width: 100%; max-width: 450px; position: relative; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); }
.close-button { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 2rem; cursor: pointer; color: #aaa; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: all 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; transform: scale(0.9); }
</style>
