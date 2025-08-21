<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'     // O header da área logada
import PublicHeader from '@/components/layout/PublicHeader.vue' // O novo header público

const route = useRoute()

// Uma computed property que verifica a 'meta' da rota atual para decidir o layout.
// Vamos configurar a 'meta' no próximo passo.
const layout = computed(() => {
  return route.meta.layout || 'default'
})
</script>

<template>
  <!-- Mostra o Header Público se o layout da rota for 'public' -->
  <PublicHeader v-if="layout === 'public'" />

  <!-- Mostra o Header da Aplicação se o layout for 'app' -->
  <AppHeader v-if="layout === 'app'" />
  
  <!-- Adicionamos uma classe ao 'main' para ajustar o espaçamento -->
  <main :class="`layout-${layout}`">
    <RouterView />
  </main>
</template>

<style>
/* Estilos globais */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
}
#app {
  min-height: 100vh;
}

/* IMPORTANTE: Adiciona um espaçamento no topo do conteúdo para não ficar
   escondido atrás do nosso cabeçalho fixo. */
main.layout-public,
main.layout-app {
  padding-top: 85px; /* Ajuste este valor se a altura do seu header for diferente */
}
</style>
