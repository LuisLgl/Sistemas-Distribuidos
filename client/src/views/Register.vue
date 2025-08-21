<template>
  <div class="cadastro-container">
    <form @submit.prevent="cadastrarUsuario" class="cadastro-form">
      <h1>Cadastrar Usuário</h1>

      <div class="form-group">
        <label for="nome">Nome Completo:</label>
        <input type="text" id="nome" v-model="form.nome" required />
      </div>

      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="senha">Senha:</label>
        <input type="password" id="senha" v-model="form.senha" required />
      </div>

      <button type="submit" class="submit-button">Cadastrar</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  nome: '',
  email: '',
  senha: '', // O campo de senha continua
})

const cadastrarUsuario = () => {
  // A verificação de senhas duplicadas foi removida
  console.log('Dados do usuário a ser cadastrado:', { nome: form.nome, email: form.email })

  // Simulando sucesso do cadastro
  setTimeout(() => {
    alert('Cadastro concluído com sucesso!')
    // Limpa o formulário
    form.nome = ''
    form.email = ''
    form.senha = ''
    // Redireciona para a tela de login
    router.push({ name: 'Login' })
  }, 500)
}
</script>

<style scoped>
.cadastro-container {
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 2rem;
  background-color: #5b21b6;
  height: 100vh;
  width: 100%;
}

.cadastro-form {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #0d244f;
  box-shadow: 0 0 0 3px rgba(13, 36, 79, 0.1);
}

.submit-button {
  padding: 0.75rem;
  background-color: #0d244f;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #1e3a8a;
}
</style>