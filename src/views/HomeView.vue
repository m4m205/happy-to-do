<script setup>
import { ref, onMounted } from "vue";
import router from "@/router";
import NiveaubepalingAPI from "@/services/niveaubepalingAPI.js";
import ItemComponent from "@/components/ItemComponent.vue";

const listsData = ref([]);
const itemsData = ref([]);
const selectedListId = ref(null);
const itemToBeDeletedId = ref(null);
const itemToBeDeletedName = ref("");
const listToBeDeletedId = ref(null);
const listToBeDeletedName = ref("");
let spinner = {};

onMounted(() => {
  // we are using bootstrap CDN way
  // eslint-disable-next-line no-undef
  spinner = new bootstrap.Modal(document.getElementById("spinner-overlay"), {
    keyboard: false,
  });
  const deleteItemModal = document.getElementById("delete-item-overlay");
  const deleteListModal = document.getElementById("delete-list-overlay");
  const cancelDeleteItemBtn = document.getElementById("cancel-delete-item");
  const cancelDeleteListBtn = document.getElementById("cancel-delete-list");
  const newItemInput = document.getElementById("new-item-input");
  const newListInput = document.getElementById("new-list-input");

  newItemInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.target.value !== "") {
      event.preventDefault();
      addNewItem(event.target.value);
    }
  });

  newListInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.target.value !== "") {
      event.preventDefault();
      addNewList(event.target.value);
    }
  });

  deleteItemModal.addEventListener("shown.bs.modal", function () {
    cancelDeleteItemBtn.focus();
  });

  deleteListModal.addEventListener("shown.bs.modal", function () {
    cancelDeleteListBtn.focus();
  });
  getLists();
});

function getLists(selectedId) {
  spinner.show();
  NiveaubepalingAPI.getLists()
    .then((res) => {
      res.json().then((resList) => {
        listsData.value = resList.data;
        selectedId
          ? getListItems(selectedId)
          : getListItems(resList.data[0].id);
        setTimeout(() => {
          spinner.hide();
        }, 500);
      });
    })
    .catch(() => router.push({ name: "error" }));
}

function getListItems(id) {
  NiveaubepalingAPI.getItems(id)
    .then((res) => {
      res.json().then((resItems) => {
        selectedListId.value = id;
        itemsData.value = resItems.data.items;
      });
    })
    .catch(() => router.push({ name: "error" }));
}

function addNewItem(item) {
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
}

function addNewList(list) {
  const newList = {
    name: list.trim(),
  };

  NiveaubepalingAPI.addList(newList).then((res) => {
    res
      .json()
      .then((res) => {
        document.getElementById("new-list-input").value = "";
        getLists(res.data.id);
      })
      .catch(() => router.push({ name: "error" }));
  });
}

function prepareUpdateItemCompleted(newValue, id) {
  const updatedItem = {
    completed: newValue,
  };
  updateItem(id, updatedItem);
}

function prepareUpdateItemText(newValue, id) {
  const updatedItem = {
    name: newValue,
  };
  updateItem(id, updatedItem);
}

function updateItem(id, object) {
  NiveaubepalingAPI.updateItem(selectedListId.value, id, object).then((res) => {
    res
      .json()
      .then(() => getListItems(selectedListId.value))
      .catch(() => router.push({ name: "error" }));
  });
}

function prepareDeleteItem(id, name) {
  itemToBeDeletedId.value = id;
  itemToBeDeletedName.value = name;
}

function deleteItem() {
  if (itemToBeDeletedId.value === null) return;
  NiveaubepalingAPI.deleteItem(
    selectedListId.value,
    itemToBeDeletedId.value
  ).then((res) => {
    res
      .json()
      .then(() => {
        itemToBeDeletedId.value = null;
        itemToBeDeletedName.value = "";
        getListItems(selectedListId.value);
      })
      .catch(() => router.push({ name: "error" }));
  });
}

function prepareDeleteList(id, name) {
  listToBeDeletedId.value = id;
  listToBeDeletedName.value = name;
}

function deleteList() {
  if (listToBeDeletedId.value === null) return;
  NiveaubepalingAPI.deleteList(listToBeDeletedId.value)
    .then(() => {
      listToBeDeletedId.value = null;
      listToBeDeletedName.value = null;
      getLists();
    })
    .catch(() => router.push({ name: "error" }));
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
      id="delete-item-overlay"
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
            Are you sure you want to delete ( {{ itemToBeDeletedName }} ) item?
          </div>
          <div class="modal-footer">
            <button
              id="cancel-delete-item"
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="
                () => ((itemToBeDeletedId = null), (itemToBeDeletedName = ''))
              "
            >
              No
            </button>
            <button
              id="confirm-delete-item"
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
    <div
      id="delete-list-overlay"
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
            Are you sure you want to delete ( {{ listToBeDeletedName }} ) list?
          </div>
          <div class="modal-footer">
            <button
              id="cancel-delete-list"
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
              @click="
                () => ((listToBeDeletedId = null), (listToBeDeletedName = ''))
              "
            >
              No
            </button>
            <button
              id="confirm-delete-list"
              type="button"
              class="btn btn-danger"
              data-bs-dismiss="modal"
              @click="deleteList"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-between g-3">
      <div class="col-12 col-md-3 p-3 gx-2 bg-light shadow">
        <div class="input-group-text shadow-sm mb-3">
          <input
            id="new-list-input"
            type="text"
            class="form-control"
            placeholder="create list"
            autocomplete="off"
          />
        </div>
        <div
          v-for="list in listsData"
          :key="list.id"
          @click="getListItems(list.id)"
          :class="{
            'border border-primary border-2': selectedListId === list.id,
          }"
          class="card d-flex justify-content-center text-center p-2 mb-3 list-card"
        >
          <div class="nav justify-content-end list-header">
            <i
              class="bi bi-trash3-fill text-danger px-1"
              @click.stop="prepareDeleteList(list.id, list.name)"
              data-bs-toggle="modal"
              data-bs-target="#delete-list-overlay"
            ></i>
            <i class="bi bi-info-circle text-info px-1"></i>
          </div>

          <div class="input-group">
            <p class="form-control mb-0">{{ list.name }}</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 p-3 gx-2 shadow-lg">
        <div class="input-group-text shadow-sm mb-3">
          <input
            id="new-item-input"
            type="text"
            class="form-control"
            placeholder="Add to-do item here"
            autocomplete="off"
          />
        </div>
        <div v-if="itemsData.length > 0">
          <ItemComponent
            v-for="item in itemsData.slice().reverse()"
            :key="item.id"
            :input-value="item.name"
            :is-item-completed="item.completed"
            @delete="() => prepareDeleteItem(item.id, item.name)"
            @inputValue="(e) => prepareUpdateItemText(e, item.id)"
            @update:itemCompleted="
              (e) => prepareUpdateItemCompleted(e, item.id)
            "
          ></ItemComponent>
        </div>
        <div v-else class="text-center">
          <p>Empty list!</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.list-card:hover {
  cursor: pointer;
}
.list-header {
  height: 1.5rem;
}
</style>
