<template>
  <header class="public-header">
    <div class="container">
      <RouterLink to="/login" class="logo">
        <img src="@/assets/images/logo.png" alt="Logo da Biblioteca" />
        <span>SPECIAL WEEK</span>
      </RouterLink>
      <nav class="navigation">
        <RouterLink to="/login" class="nav-link button">Login</RouterLink>
        <RouterLink :to="{ name: 'Register' }" class="nav-link button">Cadastrar-se</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
// Apenas os imports necessários são mantidos.
import { RouterLink } from 'vue-router'

// Não precisamos mais do useRouter ou do useAuthStore aqui,
// pois a navegação é tratada diretamente pelos componentes <RouterLink>.
</script>

<style scoped>
.public-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 1rem 2rem;
  position: fixed; /* Fixa o header no topo */
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

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  font-size: 1.25rem;
  color: #333;
  cursor: pointer;
  text-decoration: none; /* Garante que não haja sublinhado */
}
.logo img {
  height: 40px;
}
.navigation {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.nav-link {
  text-decoration: none;
  color: #555;
  font-weight: 500;
  transition: color 0.3s;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
}
.nav-link:hover {
  color: #0d244f;
}
.nav-link.button {
  background-color: #0d244f;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s;
}
.nav-link.button:hover {
  background-color: #1e3a8a;
  color: #fff;
}
</style>
