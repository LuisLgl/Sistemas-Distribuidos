import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBooksStore = defineStore('books', () => {
  const searchQuery = ref('')
  const sortOrder = ref(null) // 'asc' para ascendente, null para sem ordem

  function setSearchQuery(query) {
    searchQuery.value = query
  }
  
  function toggleSortOrder() {
    sortOrder.value = sortOrder.value === 'asc' ? null : 'asc';
  }

  return { searchQuery, setSearchQuery, sortOrder, toggleSortOrder }
})