<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 class="menu-title" v-show="uiStore.isSidebarExpanded">Menu</h2>
      <button class="icon-button pin-button" @click="uiStore.togglePin()">
        <svg v-if="uiStore.isSidebarPinned" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M10 17h4"></path><path d="M5.43 7.43C5.15 7.15 5 6.78 5 6.4V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1.4c0 .38-.15.75-.43 1.03l-5.57 5.57V17"></path></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M10 17h4"></path><path d="M5.43 7.43C5.15 7.15 5 6.78 5 6.4V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1.4c0 .38-.15.75-.43 1.03l-5.57 5.57V17"></path><line x1="5" y1="5" x2="19" y2="19"></line></svg>
      </button>
    </div>

    <nav class="nav">
      <router-link to="/main/dashboard" class="nav-item">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span class="nav-text" v-show="uiStore.isSidebarExpanded">Dashboard</span>
      </router-link>
      <router-link to="/main/analytics" class="nav-item">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
        <span class="nav-text" v-show="uiStore.isSidebarExpanded">Analytics</span>
      </router-link>
      <router-link to="/main/settings" class="nav-item">
        <svg class="nav-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-4.44l-3.45 3.45-1.11 6.32 4.44 4.44 6.32-1.11L22 7.78l-3.45-3.45L12.22 2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        <span class="nav-text" v-show="uiStore.isSidebarExpanded">Settings</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/ui';

const uiStore = useUiStore();
</script>

<style lang="scss" scoped>
.sidebar {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: #f4f6f8;
  border-right: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 0.5rem;
  min-height: 24px;
}

.menu-title {
  font-size: 1.25rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
}

.nav {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;

  .nav-icon {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }

  .nav-text {
    margin-left: 1rem;
  }

  &:hover,
  &.router-link-exact-active {
    background-color: #e0e0e0;
  }
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  } 
}

.app-layout.sidebar-collapsed {
  .sidebar {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .nav-item {
    justify-content: center;
  }
}
</style>
