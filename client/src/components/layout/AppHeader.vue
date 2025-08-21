<template>
  <header class="app-header" ref="headerRef">
    <!-- 1. BARRA SUPERIOR: Logo, Busca e Ações do Usuário -->
    <div class="top-bar">
      <div class="container top-bar-content">
        <div class="logo-container">
          <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
          <span class="logo-text">SPECIAL WEEK</span>
        </div>

        <div class="user-actions">
          <!-- Busca Interativa -->
          <div class="search-wrapper">
            <input
              ref="searchInput"
              type="text"
              :class="['search-input', { 'active': isSearchActive }]"
              v-model="searchQuery"
              placeholder="Buscar..."
              @keyup.enter="performSearch"
            />
            <button @click="toggleSearch" class="action-button" aria-label="Buscar">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </button>
          </div>

          <!-- Botão Adicionar Livro -->
           <button @click="authStore.openAddItemModal()" class="action-button" aria-label="Adicionar Livro">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>

          <!-- Menu de Perfil do Usuário (Dropdown) -->
          <div class="profile-menu" ref="profileMenuRef">
            <button @click="toggleProfileMenu" class="profile-button" aria-label="Menu do Usuário" :aria-expanded="isProfileMenuOpen">
              <div class="avatar">AM</div>
            </button>
            <Transition name="fade">
              <div v-if="isProfileMenuOpen" class="profile-dropdown">
                <div class="dropdown-header">
                  <strong>Aurea Macedo</strong>
                  <small>aurea@email.com</small>
                </div>
                <ul>
                  <li><a href="#">Meu Perfil</a></li>
                  <li><a href="#">Configurações</a></li>
                  <li><button @click="handleLogout">Sair</button></li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. BARRA DE NAVEGAÇÃO PRINCIPAL -->
    <nav class="main-nav">
      <div class="container">
        <!-- O botão "Adicionar Livro" abre o modal -->
        <button @click="authStore.openAddItemModal()" class="nav-link">Adicionar Livro</button>
        <!-- O link "Listar Livros" leva para a página principal -->
        <RouterLink to="/" class="nav-link">Listar Livros</RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// --- Lógica da Busca ---
const isSearchActive = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);

function toggleSearch() {
  isSearchActive.value = !isSearchActive.value;
  if (isSearchActive.value) {
    nextTick(() => {
      if (searchInput.value) searchInput.value.focus();
    });
  }
}
function performSearch() {
  if (searchQuery.value.trim() === '') return;
  alert(`Buscando por: ${searchQuery.value}`);
}

// --- Lógica do Menu de Perfil ---
const isProfileMenuOpen = ref(false);
const profileMenuRef = ref(null); // Ref para o elemento do menu

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

// Função para fechar o menu se clicar fora dele
const handleClickOutside = (event) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
};

// Adiciona e remove o listener de clique no documento
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});


// --- Lógica de Autenticação e UI ---
const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  toggleProfileMenu(); // Fecha o menu ao sair
  authStore.logout();
  router.push({ name: 'Login' });
};
</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* --- Barra Superior --- */
.top-bar {
  border-bottom: 1px solid #e5e7eb;
}
.top-bar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.logo { height: 36px; }
.logo-text { font-weight: 600; font-size: 1.25rem; color: #111827; }

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.action-button {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  transition: background-color 0.3s, color 0.3s;
}
.action-button:hover {
  background-color: #f3f4f6;
  color: #111827;
}

/* --- Busca --- */
.search-wrapper { display: flex; align-items: center; }
.search-input {
  width: 0;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  border-bottom: 2px solid transparent;
  outline: none;
  font-size: 1rem;
  transition: width 0.4s ease-in-out, padding 0.4s ease-in-out;
}
.search-input.active {
  width: 200px;
  padding-left: 0.5rem;
  border-bottom-color: #0d244f;
}

/* --- Menu de Perfil --- */
.profile-menu { position: relative; }
.profile-button { background: none; border: none; cursor: pointer; padding: 0; border-radius: 50%; }
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #0d244f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
  transition: transform 0.2s;
}
.profile-button:hover .avatar {
  transform: scale(1.1);
}
.profile-dropdown {
  position: absolute;
  top: 120%;
  right: 0;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 220px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}
.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}
.dropdown-header strong { display: block; color: #111827; }
.dropdown-header small { color: #6b7280; }
.profile-dropdown ul { list-style: none; margin: 0; padding: 0.5rem; }
.profile-dropdown li a, .profile-dropdown li button {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  border-radius: 4px;
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.profile-dropdown li a:hover, .profile-dropdown li button:hover {
  background-color: #f3f4f6;
}
.profile-dropdown li button { color: #ef4444; font-weight: 500; }

/* --- Barra de Navegação Principal --- */
.main-nav {
  background-color: #ffffff;
}
.main-nav .container {
  display: flex;
  gap: 2rem;
  height: 50px;
  align-items: center;
}
.nav-link {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: color 0.3s, border-color 0.3s;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
.nav-link:hover {
  color: #111827;
}
/* Estilo para a rota ativa */
.nav-link.router-link-active {
  color: #0d244f;
  border-bottom-color: #0d244f;
}

/* Animação de Fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
