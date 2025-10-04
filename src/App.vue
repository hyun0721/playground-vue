<template>
  <div class="app-layout" :class="{ 'sidebar-collapsed': !uiStore.isSidebarExpanded }">
    <TheHeader class="header-area" />
    <TheSidebar
      class="sidebar-area"
      @mouseenter="handleSidebarMouseEnter"
      @mouseleave="handleSidebarMouseLeave"
    />
    <main class="content-area">
      <RouterView />
    </main>
    <TheFooter class="footer-area" />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import TheSidebar from './components/TheSidebar.vue'
import TheFooter from './components/TheFooter.vue'
import { useUiStore } from '@/stores/ui'

const uiStore = useUiStore()

const handleSidebarMouseEnter = () => {
  if (!uiStore.isSidebarPinned) {
    uiStore.setSidebarExpanded(true)
  }
}

const handleSidebarMouseLeave = () => {
  if (!uiStore.isSidebarPinned) {
    uiStore.setSidebarExpanded(false)
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  display: grid;
  height: 100vh;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  transition: grid-template-columns 0.3s ease;

  &.sidebar-collapsed {
    grid-template-columns: 80px 1fr;
  }
}

.header-area {
  grid-area: header;
}

.sidebar-area {
  grid-area: sidebar;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width 0.3s ease;
}

.content-area {
  grid-area: content;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f9f9f9;
}

.footer-area {
  grid-area: footer;
}

// Responsive layout for tablets and mobile
@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header"
      "content"
      "footer";

    &.sidebar-collapsed {
      grid-template-columns: 1fr;
    }
  }

  .sidebar-area {
    display: none; // Hide sidebar on smaller screens
  }
}
</style>