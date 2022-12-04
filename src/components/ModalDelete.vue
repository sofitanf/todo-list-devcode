<template>
  <div v-if="active" class="modal-backdrop fade show"></div>
  <div ref="modal" class="modal fade" :class="{ show }" :style="{ display: active ? 'block' : 'none' }" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-4">
        <div class="modal-body text-center d-flex flex-column gap-5 align-items-center justify content-center">
          <img src="../assets/danger.png" alt="" />
          <div>
            <p>Apakah anda yakin menghapus {{ type }}</p>
            <p class="fw-700">“{{ title }}”?</p>
          </div>
          <div class="d-flex gap-4">
            <button data-cy="modal-delete-cancel-button" @click="toggleModal" class="btn bg-gray fw-600">Batal</button>
            <button data-cy="modal-delete-confirm-button" @click="deleteComponent" class="btn bg-red fw-600 text-white">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  const props = defineProps({
    title: String,
    type: String,
    data: String,
  });
  const emit = defineEmits(['deleteItem']);

  const active = ref(false);
  const show = ref(false);

  const toggleModal = () => {
    const body = document.querySelector('body');
    const modal = document.getElementsByClassName('modal')[0];
    active.value = !active.value;
    if (active) {
      body.classList.add('modal-open');
      modal.style.display = 'block !important';
    } else {
      body.classList.remove('modal-open');
      modal.style.display = 'none !important';
    }
    setTimeout(() => (show.value = !show.value), 100);
  };

  const deleteComponent = () => {
    emit('deleteItem');
    toggleModal();
  };

  defineExpose({
    toggleModal,
  });
</script>
<style scoped>
  .bg-gray,
  .bg-gray:active {
    background-color: var(--gray);
    z-index: 9999;
  }
  .bg-red,
  .bg-red:active {
    background-color: var(--red);
  }
</style>
