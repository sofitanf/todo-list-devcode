<script setup>
  import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="container">
      <router-link to="/">
        <p class="text-white fw-700">TO DO LIST APP</p>
      </router-link>
    </div>
  </header>

  <RouterView />
</template>

<style>
  html,
  body {
    height: 100%;
  }
  body,
  #app {
    height: 100vh;
    padding: 0;
  }
  :root {
    --blue: #16abf8;
    --gray: #f4f4f4;
    --gray2: #888888;
    --red: #ed4c5c;
  }
  a {
    text-decoration: none;
  }
  * {
    font-family: 'Poppins', sans-serif;
  }
  .fw-700 {
    font-weight: 700;
  }
  .fw-600 {
    font-weight: 600;
  }
  .bg-gray {
    background-color: var(--gray);
  }
  .btn {
    border-radius: 45px;
    padding: 13.5px;
    width: 159px;
  }

  header {
    background-color: var(--blue);
    padding: 35px;
    font-size: 24px;
  }
  section {
    height: 100vh;
    padding: 50px;
  }
  p {
    margin: 0;
  }
  img:not(.asset) {
    cursor: pointer;
  }
  .container {
    padding: 0 5rem;
  }
  .very-high {
    background: var(--red);
  }
  .high {
    background: #ffce31;
  }
  .normal {
    background: #00a790;
  }
  .low {
    background: #43c4e3;
  }
  .very-low {
    background: #b01aff;
  }
  .todo-type {
    height: 14px;
    width: 14px;
    border-radius: 50%;
  }
</style>
