<template>
  <nav class="navbar">
    <div class="container navbar-container">
      <div class="navbar-brand">
        <RouterLink to="/" class="logo" @click="closeMenu">My Website</RouterLink>
      </div>
      <button class="navbar-toggle" @click="toggleMenu" ref="toggleButton">
        <span class="navbar-toggle-icon"></span>
      </button>
      <div class="navbar-menu" :class="{ 'is-active': isMenuOpen }" ref="menu">
        <RouterLink to="/" class="nav-item" @click="closeMenu">홈</RouterLink>
        <RouterLink to="/about" class="nav-item" @click="closeMenu">소개</RouterLink>
        <RouterLink to="/contact" class="nav-item" @click="closeMenu">연락처</RouterLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

// HTMLElement 타입 확장
declare module '@vue/runtime-core' {
  interface HTMLElement {
    _clickOutside?: (event: MouseEvent) => void
  }
}

const isMenuOpen = ref(false)
const menu = ref<HTMLElement | null>(null)
const toggleButton = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// 외부 클릭 감지
const handleClickOutside = (event: MouseEvent) => {
  if (menu.value && !menu.value.contains(event.target as Node) && 
      toggleButton.value && !toggleButton.value.contains(event.target as Node)) {
    closeMenu()
  }
}

// 포커스 변경 감지
const handleFocusChange = (event: FocusEvent) => {
  if (menu.value && !menu.value.contains(event.target as Node) && 
      toggleButton.value && !toggleButton.value.contains(event.target as Node)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('focusin', handleFocusChange)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('focusin', handleFocusChange)
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/abstracts/_mixins.scss';

// 변수
$navbar-height: 60px;
$navbar-bg: #ffffff;
$navbar-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
$navbar-link-color: #666;
$navbar-link-hover-color: #333;
$navbar-link-active-color: #42b883;

.navbar {  
  height: $navbar-height;
  background-color: $navbar-bg;
  box-shadow: $navbar-shadow;

  &-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-brand {
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      color: $navbar-link-color;
      transition: color 0.3s ease;

      &:hover {
        color: $navbar-link-hover-color;
      }
    }
  }

  &-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    position: relative;
    z-index: 100;

    @include respond-to('mobile') {
      display: block;
    }

    &-icon {
      display: block;
      width: 24px;
      height: 2px;
      background-color: $navbar-link-color;
      position: relative;
      transition: background-color 0.3s ease;

      &::before,
      &::after {
        content: '';
        position: absolute;
        width: 24px;
        height: 2px;
        background-color: $navbar-link-color;
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

  &-menu {
    display: flex;
    gap: 1.5rem;
    align-items: center;

    @include respond-to('mobile') {
      position: fixed;
      top: $navbar-height;
      left: 0;
      right: 0;
      background-color: $navbar-bg;
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
      box-shadow: $navbar-shadow;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 99;

      &.is-active {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }
  }
}

.nav-item {
  text-decoration: none;
  color: $navbar-link-color;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: $navbar-link-hover-color;
  }

  &.router-link-active {
    color: $navbar-link-active-color;
  }
}
</style> 