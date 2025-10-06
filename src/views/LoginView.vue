<template>
  <div class="login-container">
    <div class="login-form">
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-spinner"></div>
      </div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">ID</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
          <p v-if="loginError" class="error-message">{{ loginError }}</p>
        </div>
        <div class="button-group">
          <button type="button" @click="handleSignUp">회원가입</button>
          <button type="submit" :disabled="isLoading">로그인</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const passwordError = ref('')
const loginError = ref('')
const isLoading = ref(false)
const router = useRouter()

const validatePassword = (password: string) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (import.meta.env.DEV && username.value === 'admin' && password === 'admin') {
    return true;
  }

  return passwordRegex.test(password);
}

const mockLoginAPI = (user: string, pass: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      // 개발환경 관리자 로그인
      if (import.meta.env.DEV && username.value === 'admin' && password.value === 'admin') {
        resolve({ success: true });
      } 

      if (user === 'testuser' && pass === 'Password123!') {
        resolve({ success: true });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
}

const handleLogin = async () => {
  passwordError.value = '';
  loginError.value = '';

  if (!validatePassword(password.value)) {
    passwordError.value = '비밀번호는 8자 이상이어야 하며, 영문 대소문자, 숫자, 특수문자를 모두 포함해야 합니다.';
    return;
  }

  isLoading.value = true;
  try {
    await mockLoginAPI(username.value, password.value);
    router.push('/main/dashboard');
  } catch (error) {
    loginError.value = '아이디 또는 비밀번호가 일치하지 않습니다.';
  } finally {
    isLoading.value = false;
  }
}

const handleSignUp = () => {
  // Handle sign-up logic here
  console.log('Redirecting to sign up')
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
}

.login-form {
  position: relative;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.loading-spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}

.error-message {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;

  button {
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 48%;

    &[type="submit"] {
      background-color: #007bff;
      color: white;
    }

    &[type="button"] {
      background-color: #6c757d;
      color: white;
    }
  }
}
</style>
