<script setup>
  import { ref } from 'vue';

  const hasFocus= ref(false);
  const props = defineProps({
    itemText: String,
    isItemCompleted: Boolean,
    itemId: Number
  })

  const emit = defineEmits(['update', 'delete'])

  const itemClicked = ()=> {
    hasFocus.value = true;
    setTimeout(()=>{
      document.getElementById('item-text-input').focus();
    },0)
  }

   const saveClicked = ()=> {
    hasFocus.value = false;
  }


</script>

<template>
  <div class="card p-2 mb-3 rounded-3">
    <div class="nav justify-content-end item-header">
      <i class="bi bi-check-circle-fill text-success px-1" @click="saveClicked"></i>
      <i class="bi bi-trash3-fill text-danger px-1" @click="$emit('delete', itemId)" data-bs-toggle="modal" data-bs-target="#delete-overlay"></i>
      <i class="bi bi-info-circle text-info px-1"></i>
    </div>

    <div v-if="hasFocus" class="input-group">
      <div class="input-group-text">
        <input class="form-check-input mt-0" type="checkbox" value="" :checked="isItemCompleted" aria-label="Checkbox for following text input">
      </div>
      <input id="item-text-input" v-model="itemText" type="text" class="form-control" aria-label="Text input with checkbox">
    </div>

    <div v-else class="input-group">
      <div class="input-group-text">
        <input class="form-check-input mt-0" type="checkbox" aria-label="Checkbox for following text input"
            :checked="isItemCompleted"
            :value="itemId"
            v-model="isItemCompleted"
            >
      </div>
      <p class="form-control mb-0"
          :class="{ 'text-decoration-line-through': isItemCompleted }"
          @click="itemClicked">
        {{itemText}}
      </p>
    </div>
  </div>
</template>

<style scoped>
  .item-header{
    height:1.5rem;
  }

  input:hover, i:hover, p:hover {
    cursor: pointer;
  }

</style>
