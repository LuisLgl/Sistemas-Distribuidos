<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  livro: {
    type: Object,
    required: true
  }
});

// Define os eventos que este componente pode emitir
defineEmits(['edit', 'delete']);
</script>

<template>
  <div class="book-card">
    <div class="book-actions">
      <button class="action-btn edit-btn" @click.stop="$emit('edit', livro.id)" aria-label="Editar">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
      </button>
      <button class="action-btn delete-btn" @click.stop="$emit('delete', livro.id)" aria-label="Excluir">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
      </button>
    </div>

    <img :src="livro.imagem" :alt="'Capa do livro ' + livro.titulo" class="book-image">
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
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative; /* Essencial para posicionar os ícones */
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

/* Estilos dos botões de ação */
.book-actions {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}
.book-card:hover .book-actions {
  opacity: 1; /* Torna os botões visíveis no hover */
}
.action-btn {
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #555;
  transition: all 0.2s;
}
.action-btn:hover {
  background-color: white;
  transform: scale(1.1);
  color: #333;
}
.delete-btn { color: #e74c3c; }
.delete-btn:hover { color: #c0392b; }
</style>