<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2 class="menu-title" v-show="uiStore.isSidebarExpanded">Menu</h2>
      <button class="icon-button pin-button" @click="uiStore.togglePin()">
        <i class="pi" :class="uiStore.isSidebarPinned ? 'pi-lock' : 'pi-lock-open'"></i>
      </button>
    </div>

    <nav class="nav">
      <router-link to="/main/dashboard" class="nav-item">
        <i class="nav-icon pi pi-home"></i>
        <span class="nav-text" v-show="uiStore.isSidebarExpanded">Dashboard</span>
      </router-link>
      <router-link to="/main/analytics" class="nav-item">
        <i class="nav-icon pi pi-chart-bar"></i>
        <span class="nav-text" v-show="uiStore.isSidebarExpanded">Analytics</span>
      </router-link>
      <router-link to="/main/settings" class="nav-item">
        <i class="nav-icon pi pi-cog"></i>
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
@use '@/assets/styles/abstracts/variables' as *;

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
    font-size: 1.5rem; // 아이콘 크기 조절
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
  font-size: 1.5rem; // 아이콘 크기 조절
  color: $color-text;

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
