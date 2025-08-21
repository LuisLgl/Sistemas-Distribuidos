import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  // state: Sabe se o usuário está logado.
  state: () => ({
    isLoggedIn: false,
  }),

  // actions: Funções para fazer login e logout.
  actions: {
    login() {
      this.isLoggedIn = true;
    },

    logout() {
      this.isLoggedIn = false;
    },
  },
})