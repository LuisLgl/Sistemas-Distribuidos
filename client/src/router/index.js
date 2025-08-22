import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore.js'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import RegisterBook from '@/views/RegisterBook.vue'
import EditBook from '@/views/EditBook.vue'
import InfoBook from '@/views/InfoBook.vue' // <-- 1. Importe o novo componente

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'public' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { layout: 'public' }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { layout: 'app' }
  },
  {
    path: '/register-book',
    name: 'RegisterBook',
    component: RegisterBook,
    meta: { layout: 'app' }
  },
  {
    path: '/edit-book/:id',
    name: 'EditBook',
    component: EditBook,
    meta: { layout: 'app' }
  },
  {
    path: '/book/:id', // <-- 2. Adicione a nova rota dinâmica para a página de detalhes
    name: 'InfoBook',
    component: InfoBook,
    meta: { layout: 'app' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.layout === 'app' && !authStore.isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router