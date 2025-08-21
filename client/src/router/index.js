import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'  // <-- Importa a página de cadastro

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'public' } // layout público
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { layout: 'public' } // layout público
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'app' } // layout da aplicação (requer login)
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guarda global de navegação
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Rotas que exigem login
  if (to.meta.layout === 'app' && !authStore.isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router