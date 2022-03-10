<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <header class="mt-2">
      <div class="mt-2">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
    <div class="container">
      <RouterView />
    </div>
    <footer class="mt-auto bg-secondary bg-gradient text-white-75">
      <p class="text-end fw-bold pe-2 pt-1 align-middle">developed by: Mahmoud Almorahlee</p>
    </footer>
  </div>
</template>

<style>
@import "@/assets/base.css";
header {
  height: 2rem;

}

footer{
  /* background-color: aquamarine; */
  height: 1.75rem;
}




</style>
