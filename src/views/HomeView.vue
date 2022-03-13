<script setup>
import { ref, onMounted } from "vue"
import router from "@/router"
import NiveaubepalingAPI from "@/services/niveaubepalingAPI.js"
import ItemComponent from "@/components/ItemComponent.vue"

const listsData = ref([]);
const itemsData = ref([]);
const selectedListId = ref(null);
const itemToBeDeletedId = ref(null);
let spinner = {};

onMounted(() => {
  spinner = new bootstrap.Modal(document.getElementById("spinner-overlay"), {
    keyboard: false,
  });
  const deleteModal = document.getElementById("delete-overlay");
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  const newItemInput = document.getElementById("new-item-input");

  newItemInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addNewItem(event.target.value);
    }
  });

  deleteModal.addEventListener("shown.bs.modal", function () {
    cancelDeleteBtn.focus();
  });
  spinner.show();
  NiveaubepalingAPI.getLists()
    .then((res) => {
      res.json().then((resList) => {
        if (resList.data?.length > 0) {
          listsData.value = resList.data;
          selectedListId.value = resList.data[0].id;
          getListItems(selectedListId.value);
        }
        setTimeout(() => {
          spinner.hide();
        }, 250);
      });
    })
    .catch(() => router.push({ name: "error" }));
});

const getListItems = (id) => {
  NiveaubepalingAPI.getItems(id)
    .then((res) => {
      res.json().then((resItems) => {
        if (resItems.data?.items?.length > 0) {
          itemsData.value = resItems.data.items;
        }
      });
    })
    .catch(() => router.push({ name: "error" }));
};

const addNewItem = (item) => {
  const newItem = {
    name: item.trim(),
  };

  NiveaubepalingAPI.addItem(selectedListId.value, newItem).then((res) => {
    res
      .json()
      .then(() => {
        document.getElementById("new-item-input").value = "";
        getListItems(selectedListId.value);
      })
      .catch(() => router.push({ name: "error" }));
  });
};

function updateItem(event) {
  const updatedItem = {
    completed: event.target.checked,
  };
  NiveaubepalingAPI.updateItem(
    selectedListId.value,
    event.target.value,
    updatedItem
  ).then((res) => {
    res
      .json()
      .then(() => getListItems(selectedListId.value))
      .catch(() => router.push({ name: "error" }));
  });
}
function prepareDeleteItem(payload) {
  itemToBeDeletedId.value = payload;
}

function deleteItem() {
  if (itemToBeDeletedId.value === null) return;
  NiveaubepalingAPI.deleteItem(
    selectedListId.value,
    itemToBeDeletedId.value
  ).then((res) => {
    res
      .json()
      .then(() => getListItems(selectedListId.value))
      .catch(() => router.push({ name: "error" }));
  });
}
</script>

<template>
  <main class="container shadow-sm p-5">
    <div
      id="spinner-overlay"
      class="modal"
      tabindex="-1"
      aria-labelledby="spinnerModalLabel"
      aria-hidden="true"
    >
      <div
        class="d-flex align-items-center justify-content-center h-100 modal-dialog"
      >
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden" id="spinnerModalLabel">Loading...</span>
        </div>
      </div>
    </div>
    <div
      id="delete-overlay"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="confirmModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmModalLabel">Confirm</h5>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this item?
          </div>
          <div class="modal-footer">
            <button
              id="cancel-delete"
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="() => (itemToBeDeletedId = null)"
            >
              No
            </button>
            <button
              id="confirm-delete"
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteItem"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-between g-3">
      <div class="col-3 p-3 gx-3 shadow">
        <div
          v-for="list in listsData"
          :key="list.id"
          @click="getListItems(list.id)"
          class="card d-flex align-items-center justify-content-center text-center mb-2 list-card"
        >
          <p class="p-2 mb-0">{{ list.name }}</p>
        </div>
      </div>
      <div class="col-8 p-3 gx-3 shadow">
        <div class="input-group-text shadow-sm mb-3">
          <input
            id="new-item-input"
            type="text"
            class="form-control"
            placeholder="Add to-do item here"
          />
        </div>
        <div v-if="itemsData.length > 0">
          <ItemComponent
            v-for="item in itemsData.slice().reverse()"
            :key="item.id"
            :item-text="item.name"
            :is-item-completed="item.completed"
            :item-id="item.id"
            @delete="prepareDeleteItem"
            @change="updateItem"
          ></ItemComponent>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.list-card {
  min-height: 2rem;
}
.list-card:hover {
  cursor: pointer;
}
</style>
