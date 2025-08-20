<script setup>
defineProps({
  livro: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="book-card">
    <img :src="livro.imagem" :alt="'Capa do livro ' + livro.titulo" class="book-image"> <!-- Tentar uisar a imagem do livro. P/ isso, precisa adicionar o campo de imagem no formulario -->
    <div class="book-info">
      <h3 class="book-title">{{ livro.titulo }}</h3>
      <p class="book-author">{{ livro.autor }}</p>
      <div class="book-details">
        <span v-if="livro.paginas" class="book-pages">{{ livro.paginas }} páginas</span>
        <span v-if="livro.ano" class="book-year">• {{ livro.ano }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.book-card {
  width: 15rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* margin: 1rem; */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

.book-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.book-info {
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  color: #333;
  font-weight: bold;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-author {
  font-size: 0.875rem;
  color: #666;
  margin: 0 0 0.5rem 0;
  font-style: italic;
}

.book-details {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #888;
}

.book-pages, .book-year {
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}
</style>