<script setup>
import { ref, onMounted } from 'vue'
import NiveaubepalingAPI from "@/services/niveaubepalingAPI.js";
import ItemComponent from "@/components/ItemComponent.vue";

const listsData = ref([])
const itemsData = ref([])
const selectedListId = ref(null)
const itemToBeDeletedId = ref(null)
let spinner = {};

onMounted(() => {
  spinner = new bootstrap.Modal(document.getElementById('spinner-overlay'), { keyboard: false })
  const deleteModal = document.getElementById('delete-overlay')
  const cancelDeleteBtn = document.getElementById('cancel-delete')
  const newItemInput = document.getElementById('new-item-input')


  newItemInput.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewItem(event.target.value);
    }
  });

  deleteModal.addEventListener('shown.bs.modal', function () {
    cancelDeleteBtn.focus()
  })
  spinner.show()
  NiveaubepalingAPI.getLists()
  .then((res) => {
      res.json().then(
        (resList) => {
          if (resList.data?.length > 0) {            
            listsData.value = resList.data
            selectedListId.value = resList.data[0].id
            getListItems(resList.data[0].id)
          }
          setTimeout(() => {
                spinner.hide()
              }, 250) 
        }
      )
    } 
  ).catch()
})

const getListItems = (id) => {
    NiveaubepalingAPI.getItems(id)
    .then((res) => {
      res.json().then(
        (resItems) => {
          if (resItems.data?.items?.length > 0) {          
            itemsData.value = resItems.data.items
          }
        }
      )
    } 
  )
}

  const addNewItem = (item) => {
    const newItem = {
      name: item.trim()
    }

    NiveaubepalingAPI.addItem( selectedListId.value, newItem)
      .then((res) => {
        res.json().then(
          () => {
            document.getElementById('new-item-input').value = ''
            getListItems(selectedListId.value)           
          }
        ).catch((err) => {
          // console.log('i am here', err)

        })
      }) 
  }

  function updateItem(event) {
    const updatedItem = {
      completed: event.target.checked
    }
    NiveaubepalingAPI.updateItem( selectedListId.value, event.target.value, updatedItem)
      .then((res) => {
        res.json().then(
          () => getListItems(selectedListId.value)
        ).catch((err) => {
          // console.log('i am here', err)
        })
      }) 
  }
    function prepareDeleteItem (payload) {
      itemToBeDeletedId.value = payload
    }

    function deleteItem() {
      console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiii' );
    NiveaubepalingAPI.deleteItem( selectedListId.value, itemToBeDeletedId.value)
      .then((res) => {
        res.json().then(
          () => getListItems(selectedListId.value)
        ).catch((err) => {
          // console.log('i am here', err)
        })
      }) 
  }
</script>

<template>
  <main class="container shadow-sm p-5">
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
  </symbol>
  <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
  </symbol>
  <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
  </symbol>
</svg>

 <!-- todo: change the above code place -->

      <div id="spinner-overlay" class="modal" tabindex="-1" aria-labelledby="spinnerModalLabel" aria-hidden="true">
        <div class="d-flex align-items-center justify-content-center h-100 modal-dialog">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden" id="spinnerModalLabel">Loading...</span>
          </div>
        </div>
      </div>

      <div id="delete-overlay" class="modal fade" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmModalLabel">Confirm</h5>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this item?
            </div>
            <div class="modal-footer">
              <button id="cancel-delete" type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="()=> itemToBeDeletedId = null">No</button>
              <button id="confirm-delete" type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteItem">Yes</button>
            </div>
          </div>
        </div>
      </div>

    <div class="alert alert-success d-flex align-items-center" role="alert">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
      <div>
        a new item created successfully
      </div>
    </div>
    <div class="row justify-content-between g-3">
      <div class="col-3 p-3 gx-3 shadow">
        <div v-for="list in listsData" :key="list.id"
             @click="getListItems(list.id)"
             class="card d-flex align-items-center justify-content-center text-center mb-2 list-card">
          <p class="p-2 mb-0">{{list.name}}</p>
        </div>
      </div>
      <div class="col-8 p-3 gx-3 shadow">
        <div class="input-group-text shadow-sm mb-3">
          <input id="new-item-input" type="text" class="form-control" placeholder="Add to-do item here"/>
        </div>
        <div v-if="itemsData.length > 0">
          <ItemComponent v-for="item in itemsData.slice().reverse()" :key="item.id" 
              :item-text="item.name" 
              :is-item-completed="item.completed"
              :item-id="item.id"
              @delete="prepareDeleteItem"
              @change="updateItem"></ItemComponent>
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
