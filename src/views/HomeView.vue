<script setup>
import ItemComponent from "@/components/ItemComponent.vue";
</script>

<template>
  <main class="container bg-info p-5">
    <p>home is here</p>
    <div class="row justify-content-between g-3">
      <div class="col-3 p-3 gx-3 bg-secondary">
        <p>side is here</p>
      </div>
      <div class="col-8 align-self-end p-3 gx-3 bg-success">
        <ItemComponent></ItemComponent>
      </div>
    </div>
  </main>
</template>
