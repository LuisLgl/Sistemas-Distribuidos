<template>
  <header>
    <nav>
      <RouterLink to="/home" class="logo-container">
        <img src="@/assets/logo.png" alt="Logo da Aplicação" class="logo-img">
      </RouterLink>
      
      <div class="right-actions">
        
        <button
          v-if="$route.name === 'home'"
          @click="realizarBusca"
          class="action-button search-button"
          title="Buscar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        <button
          v-if="$route.name === 'home'"
          @click="adicionarItem"
          class="action-button add-button"
          title="Adicionar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        <button 
          v-if="$route.name !== 'login'" 
          @click="voltar" 
          class="action-button close-button"
          title="Voltar"
        >
          &times;
        </button>
      </div>

    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui' // Importe a store da UI

const router = useRouter()
const uiStore = useUiStore() // Instancie a store

function voltar() {
  router.back()
}

function realizarBusca() {
  alert('Função de busca ativada!')
}

// ESTA É A FUNÇÃO IMPORTANTE
function adicionarItem() {
  uiStore.openAddItemModal() // Chama a ação para abrir o pop-up
}
</script>

<style scoped>
header {
  background-color: #f0f0f0;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ddd;
}

nav {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  height: 50px; 
}

.logo-container {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  width: auto;
}

.right-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

main {
  padding: 20px;
}

/* ## ESTILOS QUE FALTAVAM ## */

/* 1. Estilo genérico para TODOS os botões de ação */
.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #e0e0e0;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.action-button svg {
  width: 20px;
  height: 20px;
}

/* 2. Estilos específicos para cada botão no hover */
.search-button:hover {
  background-color: #007bff; /* Azul */
  color: white;
}

.add-button:hover {
  background-color: #28a745; /* Verde */
  color: white;
}

.close-button {
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
}

.close-button:hover {
  background-color: #f44336; /* Vermelho */
  color: white;
  transform: rotate(90deg);
}
</style>