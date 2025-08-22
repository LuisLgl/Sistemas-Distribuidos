<template>
  <header class="app-header" ref="headerRef">
    <div class="container header-content">
          <RouterLink to="/" class="logo-container">

       <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
        <span class="logo-text">SPECIAL WEEK</span>
      </RouterLink>

      <div class="actions-and-nav">
        <RouterLink to="/" class="nav-link button">Biblioteca</RouterLink>
        <RouterLink :to="{ name: 'RegisterBook' }" class="nav-link button">Adicionar Livro</RouterLink>

        <div class="user-actions">
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

          <!-- O menu de perfil agora é dinâmico -->
          <div class="profile-menu" ref="profileMenuRef" v-if="authStore.isLoggedIn">
            <button @click="toggleProfileMenu" class="profile-button" aria-label="Menu do Utilizador" :aria-expanded="isProfileMenuOpen">
              <!-- Exibe as iniciais do utilizador -->
              <div class="avatar">{{ authStore.userInitials }}</div>
            </button>
            <Transition name="fade">
              <div v-if="isProfileMenuOpen" class="profile-dropdown">
                <div class="dropdown-header">
                  <!-- Exibe o nome completo e o e-mail do utilizador -->
                  <strong>{{ authStore.user.user_metadata.full_name }}</strong>
                  <small>{{ authStore.user.email }}</small>
                </div>
                <ul>
                  <li><button @click="handleLogout">Sair</button></li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useBooksStore } from '@/stores/bookStore';

const isSearchActive = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);
const booksStore = useBooksStore();

watch(searchQuery, (newQuery) => {
  booksStore.setSearchQuery(newQuery);
});

function toggleSearch() {
  isSearchActive.value = !isSearchActive.value;
  if (isSearchActive.value) {
    nextTick(() => {
      if (searchInput.value) searchInput.value.focus();
    });
  }
}

function performSearch() {
  booksStore.setSearchQuery(searchQuery.value);
}

const isProfileMenuOpen = ref(false);
const profileMenuRef = ref(null);

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const handleClickOutside = (event) => {
  if (profileMenuRef.value && !profileMenuRef.value.contains(event.target)) {
    isProfileMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  toggleProfileMenu();
  authStore.logout();
  router.push({ name: 'Login' });
};
</script>

<style scoped>

.logo-container {
  text-decoration: none;
}

/* O seu CSS foi mantido integralmente */
.app-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
}

.container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.logo { height: 40px; }
.logo-text { font-weight: 600; font-size: 1.25rem; color: #111827; }

.actions-and-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

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

.search-wrapper { display: flex; align-items: center; }
.search-input {
  max-width: 0;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  border-bottom: 2px solid transparent;
  outline: none;
  font-size: 1rem;
  transition: max-width 0.4s ease-in-out, padding 0.4s ease-in-out;
  overflow: hidden;
}
.search-input.active {
  max-width: 200px;
  padding-left: 0.5rem;
  border-bottom-color: #0d244f;
}

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
.nav-link.router-link-active {
  color: #0d244f;
  border-bottom-color: #0d244f;
}

.nav-link.button {
  background-color: #0d244f;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
  border: none;
}
.nav-link.button:hover {
  background-color: #1e3a8a;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
