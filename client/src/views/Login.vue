<template>
  <div class="login-container">
    <form class="login-form" @submit.prevent="fazerLogin">
      <h1>Acesse sua Conta</h1>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="seu@email.com" required>
      </div>
      
      <div class="form-group">
        <label for="senha">Senha</label>
        <input type="password" id="senha" v-model="senha" placeholder="Sua senha" required>
      </div>
      
      <button type="submit">Entrar</button>
    </form>

    <div class="cadastro-link">
      <p>Não tem uma conta? <button type="button" @click="abrirModal">Cadastre-se</button></p>
    </div>
  </div>

  <div v-if="isModalVisible" class="modal-overlay" @click="fecharModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="fecharModal">X</button>
      
      <h2>Crie sua Conta</h2>
      <form @submit.prevent="fazerCadastro">
        <div class="form-group">
          <label for="nome-cadastro">Nome</label>
          <input id="nome-cadastro" type="text" required>
        </div>
        <div class="form-group">
          <label for="email-cadastro">Email</label>
          <input id="email-cadastro" type="email" required>
        </div>
        <button type="submit">Finalizar Cadastro</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// --- Lógica do Login ---
const email = ref('')
const senha = ref('')
const router = useRouter()

const fazerLogin = () => {
  console.log('Login com:', email.value)
  router.push({ name: 'home' })
}

// --- Lógica do Modal de Cadastro ---
const isModalVisible = ref(false) // O "interruptor" do modal

const abrirModal = () => {
  isModalVisible.value = true
}

const fecharModal = () => {
  isModalVisible.value = false
}

const fazerCadastro = () => {
  console.log('Formulário de cadastro enviado!')
  // Aqui você enviaria os dados de cadastro para o backend
  fecharModal() // Fecha o modal após o cadastro
  alert('Cadastro realizado com sucesso!')
}

</script> // 


<style scoped></style>
