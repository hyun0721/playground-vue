<template>
  <aside class="sidebar" :class="{ 'is-collapsed': isCollapsed }">
    <div class="sidebar-header">
      <h2 class="sidebar-title">메뉴</h2>
      <button class="sidebar-toggle" @click="toggleSidebar">
        <span class="toggle-icon"></span>
      </button>
    </div>
    
    <nav class="sidebar-nav">
      <div v-for="section in menuItems" :key="section.id" class="nav-section">
        <div 
          class="nav-section-header" 
          @click="(event) => handleSectionClick(section, event)"
          @mouseenter="(event) => isCollapsed && showSubmenu(section, event)"
          @mouseleave="isCollapsed && hideSubmenu()"
        >
          <h3 class="nav-section-title">
            <span class="nav-icon">{{ section.icon }}</span>
            <span class="nav-text">{{ section.title }}</span>
          </h3>
          <span class="nav-arrow" :class="{ 'is-open': isSectionOpen(section.id) }">▼</span>
        </div>
        <ul class="nav-list" v-show="isSectionOpen(section.id)">
          <li v-for="item in section.items" :key="item.id">
            <RouterLink :to="item.path" class="nav-item">
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-text">{{ item.title }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- 축소 시 표시되는 서브메뉴 팝업 -->
    <div 
      v-if="isCollapsed && activeSubmenu" 
      class="submenu-popup"
      :style="{ top: `${submenuPosition.top}px` }"
      @mouseenter="(event) => showSubmenu(activeSubmenu, event)"
      @mouseleave="hideSubmenu()"
    >
      <h3 class="submenu-title">
        <span class="submenu-icon">{{ activeSubmenu.icon }}</span>
        <span class="submenu-text">{{ activeSubmenu.title }}</span>
      </h3>
      <ul class="submenu-list">
        <li v-for="item in activeSubmenu.items" :key="item.id">
          <RouterLink :to="item.path" class="submenu-item">
            <span class="submenu-icon">{{ item.icon }}</span>
            <span class="submenu-text">{{ item.title }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface MenuItem {
  id: string
  title: string
  icon: string
  path: string
}

interface MenuSection {
  id: string
  title: string
  icon: string
  items: MenuItem[]
}

// 메뉴 데이터
const menuItems = ref<MenuSection[]>([
  {
    id: 'dashboard',
    title: '대시보드',
    icon: '📊',
    items: [
      {
        id: 'dashboard-overview',
        title: '개요',
        icon: '📈',
        path: '/dashboard'
      },
      {
        id: 'dashboard-analytics',
        title: '분석',
        icon: '📊',
        path: '/dashboard/analytics'
      }
    ]
  },
  {
    id: 'management',
    title: '관리',
    icon: '⚙️',
    items: [
      {
        id: 'management-users',
        title: '사용자 관리',
        icon: '👥',
        path: '/users'
      },
      {
        id: 'management-roles',
        title: '권한 관리',
        icon: '🔑',
        path: '/roles'
      },
      {
        id: 'management-settings',
        title: '설정',
        icon: '⚙️',
        path: '/settings'
      }
    ]
  },
  {
    id: 'content',
    title: '콘텐츠',
    icon: '📝',
    items: [
      {
        id: 'content-posts',
        title: '게시글',
        icon: '📝',
        path: '/posts'
      },
      {
        id: 'content-categories',
        title: '카테고리',
        icon: '📁',
        path: '/categories'
      },
      {
        id: 'content-comments',
        title: '댓글',
        icon: '💬',
        path: '/comments'
      }
    ]
  }
])

const isCollapsed = ref(false)
const activeSection = ref<string>('dashboard')
const activeSubmenu = ref<MenuSection | null>(null)
const submenuPosition = ref({ top: 0 })

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
  if (isCollapsed.value) {
    activeSection.value = ''
    activeSubmenu.value = null
  }
}

const handleSectionClick = (section: MenuSection, event: MouseEvent) => {
  if (isCollapsed.value) {
    // 클릭된 요소의 위치 계산
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    submenuPosition.value = { top: rect.top }
    
    // 서브메뉴 토글
    activeSubmenu.value = activeSubmenu.value?.id === section.id ? null : section
  } else {
    activeSection.value = activeSection.value === section.id ? '' : section.id
  }
}

const showSubmenu = (section: MenuSection | null, event: MouseEvent) => {
  if (isCollapsed.value && section) {
    // 호버된 요소의 위치 계산
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    submenuPosition.value = { top: rect.top }
    
    activeSubmenu.value = section
  }
}

const hideSubmenu = () => {
  if (isCollapsed.value) {
    activeSubmenu.value = null
  }
}

const isSectionOpen = (sectionId: string) => {
  return activeSection.value === sectionId
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

.sidebar {
  height: 100%;
  width: $sidebar-width;
  background-color: $sidebar-bg;
  transition: width 0.3s ease;
  overflow-y: auto;

  &.is-collapsed {
    width: $sidebar-collapsed-width;

    .sidebar-title,
    .nav-text,
    .nav-arrow {
      display: none;
    }

    .nav-icon {
      margin-right: 0;
      font-size: 1.5rem;
    }

    .nav-item {
      justify-content: center;
      padding: 0.75rem;
    }

    .nav-section-header {
      justify-content: center;
      padding: 0.75rem 0.5rem;
    }

    .nav-section-title {
      justify-content: center;
    }

    .nav-list {
      padding-left: 0;
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
  margin-bottom: 0.5rem;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $sidebar-hover;
    }
  }

  &-title {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 600;
    color: $sidebar-text;
    margin: 0;
  }
}

.nav-arrow {
  font-size: 0.75rem;
  color: $sidebar-text;
  transition: transform 0.3s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem 0.75rem 2rem;
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
  transition: margin 0.3s ease, font-size 0.3s ease;
}

.nav-text {
  font-size: 0.875rem;
  transition: opacity 0.3s ease;
}

.submenu-popup {
  position: fixed;
  left: $sidebar-collapsed-width;
  width: 200px;
  background-color: $sidebar-bg;
  border: 1px solid $sidebar-border;
  border-left: none;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem;
  border-radius: 0 4px 4px 0;

  .submenu-title {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    color: $sidebar-text;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $sidebar-border;
  }

  .submenu-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .submenu-item {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    color: $sidebar-text;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: $sidebar-hover;
    }

    &.router-link-active {
      background-color: $sidebar-active;
      font-weight: 500;
    }
  }

  .submenu-icon {
    margin-right: 0.5rem;
    font-size: 1.25rem;
    width: 24px;
    text-align: center;
  }

  .submenu-text {
    font-size: 0.875rem;
  }
}
</style> 