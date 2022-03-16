<script setup>
// ESlint role not updaed with new sintax of Vue
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  item: Object,
});
</script>

<template>
  <div class="card p-2 mb-3 rounded-3">
    <div class="nav justify-content-end item-header">
      <i class="bi bi-check-circle-fill text-success px-2"></i>
      <i
        class="bi bi-trash3-fill text-danger px-2"
        @click="$emit('delete')"
        data-bs-toggle="modal"
        data-bs-target="#delete-item-overlay"
      ></i>
      <i
        class="bi bi-info-circle text-info px-2"
        @click="$emit('showAuditTrail')"
        data-bs-toggle="modal"
        data-bs-target="#audit-trail-overlay"
      ></i>
    </div>

    <div class="input-group">
      <div class="input-group-text">
        <input
          class="form-check-input mt-0"
          type="checkbox"
          aria-label="Checkbox for following text input"
          :checked="item.completed"
          @change="(e) => $emit('update:itemCompleted', e.target.checked)"
        />
      </div>
      <input
        id="item-text-input"
        :class="{ 'text-decoration-line-through': item.completed }"
        :value="item.name"
        @change="
          (e) => {
            $emit('inputValue', e.target.value), $refs.textInput.blur();
          }
        "
        ref="textInput"
        type="text"
        class="form-control item-text-input"
        aria-label="Text input with checkbox"
        autocomplete="off"
      />
    </div>
  </div>
</template>

<style scoped>
.item-header {
  height: 2rem;
}

input:hover,
i:hover,
p:hover {
  cursor: pointer;
}
</style>
