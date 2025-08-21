import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'public' } // <-- Esta página usa o layout público
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'app' } // <-- Esta página usa o layout da aplicação
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// A lógica da guarda de navegação agora fica mais limpa
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Se a rota para onde o usuário vai exige o layout 'app' E ele não está logado...
  if (to.meta.layout === 'app' && !authStore.isLoggedIn) {
    // ...manda ele para o login.
    next({ name: 'Login' });
  } else {
    // Senão, pode ir.
    next();
  }
});

export default router
