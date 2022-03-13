<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-md navbar-light" style="background-color: #e3f2fd;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Happy to-do</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/">Home meee</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/about">About</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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

footer{
  height: 1.75rem;
}




</style>
