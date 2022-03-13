<script setup>
import { ref, onMounted } from "vue"

const props = defineProps({
  itemText: String,
  isItemCompleted: Boolean,
  itemId: Number,
});

const emit = defineEmits(["update", "delete"]);

onMounted(() => {
  const itemInput = document.getElementById('item-text-input');

  itemInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateItem(event.target.value, 'input');
    }
  });
})
</script>

<template>
  <div class="card p-2 mb-3 rounded-3">
    <div class="nav justify-content-end item-header">
      <i
        class="bi bi-check-circle-fill text-success px-1"
      ></i>
      <i
        class="bi bi-trash3-fill text-danger px-1"
        @click="$emit('delete', itemId)"
        data-bs-toggle="modal"
        data-bs-target="#delete-overlay"
      ></i>
      <i class="bi bi-info-circle text-info px-1"></i>
    </div>

    <div class="input-group">
      <div class="input-group-text">
        <input
          class="form-check-input mt-0"
          type="checkbox"
          aria-label="Checkbox for following text input"
          :checked="isItemCompleted"
          v-model="isItemCompleted"
          @change="$emit( 'CompletedChange', itemId, isItemCompleted)"
        />
      </div>
      <input
        id="item-text-input"
        :class="{ 'text-decoration-line-through': isItemCompleted }"
        v-model="itemText"
        @change="$emit( 'inputChange', itemId, itemText)"
        type="text"
        class="form-control"
        aria-label="Text input with checkbox"
      />
    </div>
  </div>
</template>

<style scoped>
.item-header {
  height: 1.5rem;
}

input:hover,
i:hover,
p:hover {
  cursor: pointer;
}
</style>
