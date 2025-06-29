<template>
  <footer class="footer">
    <div class="container">
      <!-- <div class="footer-content">
        <div class="footer-section">
          <h3>회사 정보</h3>
          <p>주소: 서울특별시</p>
          <p>전화: 02-1234-5678</p>
          <p>이메일: info@example.com</p>
        </div>
        <div class="footer-section">
          <h3>바로가기</h3>
          <ul>
            <li><a href="/about">회사 소개</a></li>
            <li><a href="/services">서비스</a></li>
            <li><a href="/contact">문의하기</a></li>
          </ul>
        </div>
      </div> -->
      <div class="footer-bottom">
        <p>&copy; 2024 My Website. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
// 변수
$footer-bg: #f8f9fa;
$footer-text-color: #666;
$footer-heading-color: #333;
$footer-border-color: #dee2e6;
$footer-link-hover-color: #42b883;

// 믹스인
@mixin mobile {
  @media screen and (max-width: 767px) {
    @content;
  }
}

.footer {
  background-color: $footer-bg;
  /* padding: 1rem 0; */

  &-content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 2rem;
    margin-bottom: 2rem;

    @include mobile {
      flex-direction: column;
      gap: 1.5rem;
    }
  }

  &-section {
    flex: 1;
    min-width: 250px;

    h3 {
      color: $footer-heading-color;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    p, li {
      color: $footer-text-color;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    a {
      color: $footer-text-color;
      text-decoration: none;
      transition: color 0.3s ease;
      font-size: 0.9rem;

      &:hover {
        color: $footer-link-hover-color;
      }
    }
  }

  &-bottom {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid $footer-border-color;

    p {
      color: $footer-text-color;
      font-size: 0.9rem;
    }
  }
}
</style> 