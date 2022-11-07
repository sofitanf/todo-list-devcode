<template>
  <div @click="toggleModal" ref="modal" data-cy="modal-alert" class="modal fade" :class="{ show, 'd-block': active }" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content py-1 px-3">
        <div class="modal-body d-flex align-items-center gap-3">
          <img src="../assets/info.png" alt="" />
          <p>Activity berhasil dihapus</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="active" class="modal-backdrop fade show"></div>
</template>
<script setup>
  import { ref } from 'vue';

  const active = ref(false);
  const show = ref(false);

  const toggleModal = () => {
    const body = document.querySelector('body');
    active.value = !active.value;
    active.value ? body.classList.add('modal-open') : body.classList.remove('modal-open');
    setTimeout(() => (show.value = !show.value), 100);
  };

  defineExpose({
    toggleModal,
  });
</script>

<style scoped>
  .bg-gray,
  .bg-gray:active {
    background-color: var(--gray);
  }
  .bg-red,
  .bg-red:active {
    background-color: var(--red);
  }
</style>
