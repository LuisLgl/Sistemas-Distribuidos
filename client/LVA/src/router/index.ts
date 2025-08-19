// CÓDIGO MODIFICADO E CORRIGIDO
import { createRouter, createWebHistory } from 'vue-router'
// A HomeView ainda é importada, pois a rota ainda existe
import HomeView from '../views/home.vue' 
import LoginView from '../views/login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // Removemos o name daqui e redirecionamos
      redirect: '/login' 
    },
    {
      path: '/login',
      name: 'login', // A página de login
      component: LoginView
    },
    {
      path: '/home', // Criamos uma rota para a home
      name: 'home',
      component: HomeView
    },
  ]
})

export default router