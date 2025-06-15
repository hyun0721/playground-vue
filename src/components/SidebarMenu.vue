<template>
  <aside class="sidebar" :class="{ 'is-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">메뉴</h2>
      <button class="sidebar-toggle" @click="toggleSidebar">
        <span class="toggle-icon"></span>
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3 class="nav-section-title">대시보드</h3>
        <ul class="nav-list">
          <li>
            <RouterLink to="/dashboard" class="nav-item">
              <span class="nav-icon">📊</span>
              <span class="nav-text">대시보드</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="nav-section">
        <h3 class="nav-section-title">관리</h3>
        <ul class="nav-list">
          <li>
            <RouterLink to="/users" class="nav-item">
              <span class="nav-icon">👥</span>
              <span class="nav-text">사용자 관리</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/settings" class="nav-item">
              <span class="nav-icon">⚙️</span>
              <span class="nav-text">설정</span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="nav-section">
        <h3 class="nav-section-title">콘텐츠</h3>
        <ul class="nav-list">
          <li>
            <RouterLink to="/posts" class="nav-item">
              <span class="nav-icon">📝</span>
              <span class="nav-text">게시글</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/categories" class="nav-item">
              <span class="nav-icon">📁</span>
              <span class="nav-text">카테고리</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style lang="scss">
// 변수
$sidebar-width: 260px;
$sidebar-collapsed-width: 80px;
$sidebar-bg: #ffffff;
$sidebar-border: #e5e7eb;
$sidebar-text: #374151;
$sidebar-hover: #f3f4f6;
$sidebar-active: #e5e7eb;

// 믹스인
/* @mixin desktop {
  @media screen and (max-width: 1024px) {
    @content;
  }
} */

.sidebar {
  height: 100%;
  width: $sidebar-width;
  background-color: $sidebar-bg;
  transition: width 0.3s ease;
  overflow-y: auto;

  &.is-collapsed {
    width: $sidebar-collapsed-width;

    .sidebar-title,
    .nav-section-title,
    .nav-text {
      display: none;
    }

    .nav-icon {
      margin-right: 0;
    }

    .nav-item {
      justify-content: center;
      padding: 0.75rem;
    }
  }

  &-header {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid $sidebar-border;
  }

  &-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: $sidebar-text;
    margin: 0;
  }

  &-toggle {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: $sidebar-text;

    .toggle-icon {
      display: block;
      width: 20px;
      height: 2px;
      background-color: currentColor;
      position: relative;

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 2px;
        background-color: currentColor;
        transition: transform 0.3s ease;
      }

      &::before {
        top: -6px;
      }

      &::after {
        bottom: -6px;
      }
    }
  }

  &-nav {
    padding: 1rem 0;
  }
}

.nav-section {
  margin-bottom: 1.5rem;

  &-title {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: $sidebar-text;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: $sidebar-text;
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: $sidebar-hover;
  }

  &.router-link-active {
    background-color: $sidebar-active;
    font-weight: 500;
  }
}

.nav-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
  width: 24px;
  text-align: center;
}

.nav-text {
  font-size: 0.875rem;
}
</style> 