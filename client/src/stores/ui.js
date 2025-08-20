import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isAddItemModalVisible: false
  }),
  actions: {
    openAddItemModal() {
      this.isAddItemModalVisible = true
    },
    closeAddItemModal() {
      this.isAddItemModalVisible = false
    }
  }
})