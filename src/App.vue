<template>
  <div class="app">
    <header class="app-header">
      <Navbar />
    </header>
    <aside class="app-sidebar">
      <SidebarMenu />
    </aside>
    <main class="app-main">
      <RouterView />
    </main>
    <footer class="app-footer">
      <Footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import SidebarMenu from './components/SidebarMenu.vue'
</script>

<style lang="scss">
@import './assets/styles/base/_reset.scss';
@import './assets/styles/abstracts/_mixins.scss';

// 그리드 레이아웃
.app {
  display: grid;
  width: 100vw;
  height: 100vh;
  /* grid-template-areas:
    "header"
    "main"
    "footer"; */
  grid-template-rows: $header-height 1fr $footer-height;
  /* grid-template-columns: 1fr; */

  grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
  grid-template-columns: $sidebar-width 1fr;

  @include respond-to('mobile') {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
  }

  @include respond-to('tablet') {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
  }

  /* @include respond-to('desktop') {
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: $sidebar-width 1fr;
  } */
}

.app-header {
  grid-area: header;
  height: $header-height;
  background-color: #fff;
  border-bottom: 1px solid $color-border;
}

.app-sidebar {
  grid-area: sidebar;
  width: $sidebar-width;
  background-color: #fff;
  border-right: 1px solid $color-border;
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: block;

  @include respond-to('mobile') {
    display: none;
  }

  @include respond-to('tablet') {
    display: none;
  }

  /* @include respond-to('desktop') {
    display: block;
  } */
}

.app-main {
  grid-area: main;
  background-color: $color-background;
  overflow-y: auto;
}

.app-footer {
  grid-area: footer;
  height: $footer-height;
  background-color: #fff;
  border-top: 1px solid $color-border;
}

// 유틸리티 클래스
.hidden-mobile {
  @include respond-to('mobile') {
    display: none;
  }
}

.hidden-tablet {
  @include respond-to('tablet') {
    display: none;
  }
}

.hidden-desktop {
  @include respond-to('desktop') {
    display: none;
  }
}
</style>
