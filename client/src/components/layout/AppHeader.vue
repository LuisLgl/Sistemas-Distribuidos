<template>
  <header class="main-header">
    <nav class="main-nav">
      <div class="container nav-container">
        <div class="logo-container">
          <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
        </div>

        <ul class="nav-links">
          <li><a href="/noticias">Notícias</a></li>
          <li><a href="/servicos">Serviços</a></li>
        </ul>

        <div class="user-actions">
          <div class="search-wrapper">
            <input
              ref="searchInput" type="text"
              :class="['search-input', { 'active': isSearchActive }]"
              v-model="searchQuery"
              placeholder="Buscar..."
              @keyup.enter="performSearch"
            />
            <button @click="toggleSearch" class="action-button" aria-label="Buscar">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>

          <button class="action-button" aria-label="Adicionar">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>

          <div class="user-profile">
            <span class="user-name">Aurea Macedo</span>
          </div>
        </div>
      </div>
    </nav>

    <div class="color-bar">
      <div class="segment yellow"></div>
      <div class="segment red"></div>
      <div class="segment blue-stripe"></div>
    </div>
  </header>
</template>

<script setup>
// 1. Importe as ferramentas necessárias do Vue
import { ref, nextTick } from 'vue';

// 2. Crie as variáveis reativas usando 'ref()'
//    'ref' é o equivalente a uma propriedade no 'data()'
const isSearchActive = ref(false);
const searchQuery = ref('');

// Para acessar um elemento do template, crie uma ref com o mesmo nome
// A linha 'ref="searchInput"' no <input> acima vai conectar o elemento a esta variável.
const searchInput = ref(null);

// 3. Declare as funções diretamente
//    Elas são o equivalente aos 'methods'
function toggleSearch() {
  // Para alterar o valor de uma 'ref', você usa .value
  isSearchActive.value = !isSearchActive.value;
  
  if (isSearchActive.value) {
    // nextTick é importado e usado diretamente
    nextTick(() => {
      // Acessamos o elemento do input diretamente através da sua ref
      if (searchInput.value) {
        searchInput.value.focus();
      }
    });
  }
}

function performSearch() {
  if (searchQuery.value.trim() === '') return;
  alert(`Buscando por: ${searchQuery.value}`);
}
</script>

<style scoped>
/* Garante que o CSS se aplique apenas a este componente */

.main-header {
  background-color: #0d244f; /* Azul escuro principal */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
}

.logo {
  height: 40px; /* Ajuste conforme o tamanho da sua logo */
  display: block;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffca28; /* Amarelo para o efeito hover */
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s ease;
}

.action-button:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

/* Estilo da Busca Interativa */
.search-wrapper {
  display: flex;
  align-items: center;
}

.search-input {
  width: 0;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  color: white;
  border-bottom: 2px solid transparent;
  outline: none;
  font-size: 1rem;
  transition: width 0.4s ease-in-out, padding 0.4s ease-in-out;
}

.search-input.active {
  width: 200px; /* Largura do campo ao expandir */
  padding-left: 0.5rem;
  border-bottom-color: #ffca28; /* Amarelo */
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* Perfil do Usuário */
.user-profile {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
}

/* Faixa Colorida */
.color-bar {
  display: flex;
  height: 4px;
}

.segment {
  flex-grow: 1;
}

.yellow { background-color: #ffca28; }
.red { background-color: #e53935; }
.blue-stripe { background-color: #1e88e5; flex-grow: 2; }
</style>