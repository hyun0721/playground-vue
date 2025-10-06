<template>
  <div class="login-container">
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">ID</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="button-group">
          <button type="button" @click="handleSignUp">회원가입</button>
          <button type="submit">로그인</button>
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
const router = useRouter()

const handleLogin = () => {
  if (import.meta.env.DEV && username.value === 'admin' && password.value === 'admin') {
    router.push('/main/dashboard')
  } else {
    alert('Invalid credentials')
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
