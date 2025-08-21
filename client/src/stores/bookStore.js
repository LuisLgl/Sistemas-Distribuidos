import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBooksStore = defineStore('books', () => {
  const searchQuery = ref('')

  function setSearchQuery(query) {
    searchQuery.value = query
  }

  return { searchQuery, setSearchQuery }
})