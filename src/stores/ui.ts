import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isSidebarExpanded = ref(true)
  const isSidebarPinned = ref(true)

  function toggleSidebar() {
    isSidebarExpanded.value = !isSidebarExpanded.value
  }

  function setSidebarExpanded(value: boolean) {
    isSidebarExpanded.value = value
  }

  function togglePin() {
    isSidebarPinned.value = !isSidebarPinned.value
    // If sidebar is pinned, it must be expanded
    if (isSidebarPinned.value) {
      isSidebarExpanded.value = true
    }
  }

  return {
    isSidebarExpanded,
    isSidebarPinned,
    toggleSidebar,
    setSidebarExpanded,
    togglePin,
  }
})
