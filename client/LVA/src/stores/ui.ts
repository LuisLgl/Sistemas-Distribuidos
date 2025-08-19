// src/stores/ui.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

// Store para controlar estados da Interface do Usuário
export const useUiStore = defineStore('ui', () => {
  // Estado: O pop-up de "Adicionar Item" está visível?
  const isAddItemModalVisible = ref(false)

  // Ação: Função para ABRIR o pop-up
  function openAddItemModal() {
    isAddItemModalVisible.value = true
  }

  // Ação: Função para FECHAR o pop-up
  function closeAddItemModal() {
    isAddItemModalVisible.value = false
  }

  return { isAddItemModalVisible, openAddItemModal, closeAddItemModal }
})