import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  const user = ref(null);
  // ADICIONADO: O estado do modal agora vive aqui
  const isAddItemModalVisible = ref(false);

  // --- GETTERS ---
  const isLoggedIn = computed(() => !!user.value);

  const userInitials = computed(() => {
    if (user.value && user.value.user_metadata?.full_name) {
      const parts = user.value.user_metadata.full_name.split(' ');
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return parts[0].substring(0, 2).toUpperCase();
    }
    return '??';
  });

  // --- ACTIONS ---
  const login = (userData) => {
    user.value = userData;
  };

  const logout = () => {
    user.value = null;
  };

  // ADICIONADO: Ações para controlar o modal
  const openAddItemModal = () => {
    isAddItemModalVisible.value = true;
  };

  const closeAddItemModal = () => {
    isAddItemModalVisible.value = false;
  };

  return {
    user,
    isLoggedIn,
    userInitials,
    isAddItemModalVisible, // <-- Exporta o estado do modal
    login,
    logout,
    openAddItemModal,      // <-- Exporta a ação de abrir
    closeAddItemModal,     // <-- Exporta a ação de fechar
  };
});
