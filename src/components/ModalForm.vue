<template>
  <div data-cy="modal-form" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <p class="modal-title fw-600" id="exampleModalLabel">{{ todoTitle }}</p>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form data-cy="form" @submit.prevent="sendData">
          <div class="modal-body">
            <div data-cy="input-name-list" class="d-flex flex-column gap-2 mb-4">
              <label class="fw-600">NAMA LIST ITEM</label>
              <input v-model="title" type="text" class="form-control" placeholder="Tambahkan nama list item" />
            </div>
            <div data-cy="select-priority" class="d-flex flex-column gap-2">
              <label class="fw-600">PRIORITY</label>
              <label data-cy="priority-dropdown" class="priority-dropdown select">
                <div class="dd-button d-flex justify-content-between">
                  <div class="d-flex gap-3 align-items-center">
                    <p :class="'todo-type ' + defaultSelected.class"></p>
                    <p class="todo-title">{{ defaultSelected.type }}</p>
                  </div>
                  <img src="../assets/chevron-down.svg" alt="" />
                </div>
                <input type="checkbox" class="dd-input" id="test" />
                <ul data-cy="priority-menu" class="dd-menu">
                  <li v-for="(option, i) in options" :key="i" @click="selectPriority(option.class, option.type)" class="d-flex align-items-center gap-3">
                    <p :class="'todo-type ' + option.class"></p>
                    <p class="todo-title">{{ option.type }}</p>
                  </li>
                </ul>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button data-cy="btn-submit" type="submit" :disabled="!validInput" data-bs-dismiss="modal" class="btn text-white">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, watch, toRefs } from 'vue';
  const emit = defineEmits(['sendFormData']);

  const props = defineProps({
    todoTitle: String,
    formValue: Object,
  });

  const validInput = ref(false);
  const title = ref('');
  const { formValue } = toRefs(props);
  const defaultSelected = ref({
    type: 'Very high',
    class: 'very-high',
  });
  const options = ref([
    {
      type: 'Very high',
      class: 'very-high',
    },
    {
      type: 'High',
      class: 'high',
    },
    {
      type: 'Medium',
      class: 'normal',
    },
    {
      type: 'Low',
      class: 'low',
    },
    {
      type: 'Very low',
      class: 'very-low',
    },
  ]);

  const selectPriority = (classData, typeClass) => {
    defaultSelected.value = { type: typeClass, class: classData };
    console.log('hi');
  };

  const sendData = () => {
    emit('sendFormData', { title: title.value, priority: defaultSelected.value.class });
    title.value = '';
    defaultSelected.value = {
      type: 'Very high',
      class: 'very-high',
    };
  };

  watch(title, () => {
    validInput.value = title.value != '';
  });
  watch(formValue, () => {
    title.value = formValue.value.title;
    defaultSelected.value = options.value.find((item) => item.class === props.formValue.priority);
  });
</script>
<style scoped>
  .priority-dropdown {
    display: inline-block;
    position: relative;
  }

  label {
    font-size: 18px;
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
    margin: 4px 0 0 -17px;
    box-shadow: 0 0 6px 0 rgb(0 0 0 / 10%);
    background-color: #ffffff;
    list-style-type: none;
    width: 12rem;
    font-size: 14px;
  }

  .dd-input + .dd-menu {
    display: none;
  }

  .dd-input:checked + .dd-menu {
    display: block;
  }

  .dd-menu li {
    padding: 10px 15px;
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
  .select {
    width: 12rem;
    border: 1px solid #ced4da;
    padding: 16px;
    border-radius: 5px;
  }
  .modal-title {
    font-size: 18px;
  }
  label {
    font-size: 12px;
  }
  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 24px 30px;
  }
  input {
    font-size: 16px;
    padding: 14px 16px;
  }
  .v-select {
    width: 205px;
  }
  div#vs1__combobox {
    padding: 10px !important;
  }
  .btn {
    background-color: var(--blue);
    border-radius: 45px;
    padding: 13.5px;
    width: 159px;
  }
  .todo-title {
    font-size: 14px;
  }
</style>
