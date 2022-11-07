<template>
  <section data-cy="activity-state" class="bg-gray pb-5">
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="d-flex gap-4 align-items-center">
          <router-link to="/">
            <img src="../assets/todo-back-button.png" alt="" />
          </router-link>
          <input data-cy="update-title" v-if="showInput" @focusout="updateTitle" tabindex="0" type="text" v-model="activity.title" class="title fw-700" />
          <p v-else data-cy="todo-title" @click="showInput = !showInput" class="title fw-700">{{ activity.title }}</p>
          <img @click="showInput = !showInput" src="../assets/todo-title-edit-button.png" alt="" />
        </div>
        <div class="d-flex align-items-center gap-4">
          <label class="dropdown">
            <img data-cy="todo-sort-button" class="dd-button" src="../assets/todo-sort-button.png" alt="" />
            <input type="checkbox" class="dd-input" id="test" />
            <ul data-cy="filter-menu" class="dd-menu">
              <li v-for="(filter, i) in filters" :key="i" @click="filterTodo(filter.text)" :data-cy="filter.data" class="d-flex align-items-center gap-3">
                <img class="filter-img" :src="filter.icon" alt="" />
                <p class="filter-text">{{ filter.text }}</p>
              </li>
            </ul>
          </label>
          <button @click="title = 'Tambah List Item'" data-cy="todo-add-button" class="btn bg-blue text-white d-flex gap-1 justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <img src="../assets/tabler_plus.png" alt="" />
            <p>Tambah</p>
          </button>
        </div>
      </div>
      <div data-cy="todo-empty-state" class="mt-5 text-center">
        <img class="asset" v-if="showAsset" width="" src="../assets/todo-empty-state.png" alt="" />
        <div v-else data-cy="todo-item-wrap">
          <div v-for="(item, i) in activity.todo_items" :key="i" data-cy="todo-item" class="todo-item d-flex justify-content-between">
            <div class="d-flex gap-3 align-items-center">
              <input data-cy="todo-item-checkbox" @change="updateActiveItem(item.id, item.is_active)" :checked="!item.is_active" class="check" type="checkbox" name="" id="" />
              <div :class="'todo-type ' + item.priority"></div>
              <p data-cy="todo-title" class="todo-title" :class="{ 'todo-done': !item.is_active }">{{ item.title }}</p>
              <img data-cy="todo-edit" data-bs-toggle="modal" @click="edit(item.title, item.priority, item.id)" data-bs-target="#exampleModal" src="../assets/todo-item-edit-button2.png" alt="" />
            </div>
            <img data-cy="todo-item-delete-button" @click.prevent="deleteModal(item.title, item.id)" src="../assets/activity-item-delete-button.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <ModalDelete data="modal-delete-confirm-button" ref="modalRemove" :title="title" type="List Item" @deleteItem="deleteTodoItem" />
    <ModalForm ref="modal" v-if="formValue" @sendFormData="receiveData" :todo-title="title" :form-value="formValue" />
    <Alert ref="alertModal" />
  </section>
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import ModalForm from '../components/ModalForm.vue';
  import ModalDelete from '../components/ModalDelete.vue';
  import down from '../assets/down.png';
  import up from '../assets/up.png';
  import az from '../assets/az.png';
  import za from '../assets/za.png';
  import updown from '../assets/up-down.png';

  const showInput = ref(false);
  const showAsset = ref(false);
  const activity = ref({});
  const route = useRoute();
  const title = ref('');
  const id = route.params.id;
  const formValue = ref({});
  const modal = ref();
  const modalRemove = ref();
  const idItem = ref();
  const filters = ref([
    { icon: down, text: 'Terbaru', data: 'sort-selection' },
    { icon: up, text: 'Terlama', data: 'sort-selection' },
    { icon: az, text: 'A-Z', data: 'todo-sort-button' },
    { icon: za, text: 'Z-A', data: 'todo-sort-button' },
    { icon: updown, text: 'Belum selesai', data: 'sort-selection' },
  ]);
  const alertModal = ref();

  const filterTodo = (text) => {
    if (text == 'Terbaru') {
      activity.value.todo_items.sort((a, b) => b.id - a.id);
    } else if (text == 'Terlama') {
      activity.value.todo_items.sort((a, b) => a.id - b.id);
    } else if (text == 'A-Z') {
      activity.value.todo_items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (text == 'Z-A') {
      activity.value.todo_items.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      activity.value.todo_items.sort((a, b) => b.is_active - a.is_active);
    }
  };

  const updateActiveItem = async (id, active) => {
    let isActive = active == 1 ? 0 : 1;
    await axios.patch(`todo-items/${id}`, { is_active: isActive });
    getActivity();
  };

  const deleteModal = (titleAct, id) => {
    modalRemove.value.toggleModal();
    title.value = titleAct;
    idItem.value = id;
  };

  const deleteTodoItem = async () => {
    await axios.delete(`todo-items/${idItem.value}`);
    getActivity();
    alertModal.value.toggleModal();
  };

  const edit = async (dataTitle, dataPriority, dataId) => {
    formValue.value = await { title: dataTitle, priority: dataPriority };
    title.value = 'Edit Item';
    idItem.value = dataId;
  };

  const updateTitle = async () => {
    const { data } = await axios.patch(`activity-groups/${id}`, { title: activity.value.title });
    activity.value.title = data.title;
    showInput.value = false;
  };

  const getActivity = async () => {
    const { data } = await axios.get(`activity-groups/${id}`);
    activity.value = data;
    showAsset.value = data.todo_items.length == 0 ? true : false;
  };

  const receiveData = async (data) => {
    if (idItem.value) {
      await axios.patch(`todo-items/${idItem.value}`, data);
      idItem.value = null;
    } else {
      data['activity_group_id'] = id;
      await axios.post('todo-items', data);
    }
    getActivity();
  };

  onMounted(() => {
    getActivity();
  });
</script>

<style scoped>
  .filter-text {
    font-size: 16px;
  }
  .dropdown {
    display: inline-block;
    position: relative;
  }

  .dd-button:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid black;
  }

  .dd-input {
    display: none;
  }

  .dd-menu {
    position: absolute;
    top: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0;
    margin: 2px 0 0 0;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    list-style-type: none;
  }

  .dd-input + .dd-menu {
    display: none;
  }

  .dd-input:checked + .dd-menu {
    display: block;
  }

  .dd-menu li {
    padding: 10px 20px;
    cursor: pointer;
    white-space: nowrap;
  }

  .dd-menu li:hover {
    background-color: #f6f6f6;
  }

  .dd-menu li a {
    display: block;
    margin: -10px -20px;
    padding: 10px 20px;
  }

  .dd-menu li.divider {
    padding: 0;
    border-bottom: 1px solid #cccccc;
  }
  .title {
    font-size: 36px;
  }
  .bg-blue,
  .bg-blue:active {
    background-color: var(--blue);
  }

  input.check {
    width: 24px;
    height: 24px;
    border: 1px solid #c7c7c7;
  }

  input:checked {
    background-color: var(--blue);
    border-color: var(--blue);
  }

  .todo-done {
    text-decoration: line-through;
    color: #888;
  }

  .todo-title {
    font-weight: 500;
    font-size: 18px;
  }

  .todo-item {
    background-color: white;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 10px;
  }
  input {
    outline: 0;
    border-width: 0 0 1px;
    border-color: black;
    background-color: var(--gray);
  }
</style>
