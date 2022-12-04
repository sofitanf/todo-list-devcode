<template>
  <section data-cy="activities-state" class="bg-gray pb-5">
    <div class="container">
      <div class="d-flex justify-content-between">
        <p data-cy="activity-title" class="title fw-700">Activity</p>
        <button data-cy="activity-add-button" @click="addActivity" class="btn bg-blue text-white d-flex gap-1 justify-content-center">
          <img src="../assets/tabler_plus.png" />
          <p>Tambah</p>
        </button>
      </div>
      <div class="mt-5 text-center">
        <img v-if="showAsset" class="asset" src="../assets/activity-empty-state.png" width="600" />
        <div v-else class="row">
          <div data-cy="activity-item" v-for="(activity, i) in activities" :key="i" class="col-3">
            <router-link :to="'/activity/' + activity.id">
              <div class="activity d-flex flex-column">
                <p data-cy="activity-item-title" class="activity-item-title text-black text-start fw-700">{{ activity.title }}</p>
                <div class="d-flex justify-content-between">
                  <div data-cy="activity-item-date" class="activity-item-date">{{ formatDate(activity.created_at) }}</div>
                  <img data-cy="activity-item-delete-button" @click.prevent="deleteModal(activity.title, activity.id)" src="../assets/activity-item-delete-button.png" />
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ModalDelete data="activity-item-delete-button" modal="modal-delete" ref="modal" :title="title" type="activity" @deleteItem="deleteActivity" />
  <Alert ref="alertModal" />
</template>
<script setup>
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  import ModalDelete from '../components/ModalDelete.vue';
  import Alert from '../components/Alert.vue';
  import formatDate from '../helper/formatDate';

  emits: ['deleteItem'];
  const activities = ref([]);
  const showAsset = ref(false);
  const showModal = ref(false);
  const modal = ref();
  const alertModal = ref();
  const title = ref(null);
  const id = ref(0);
  const email = 'sofitanurfitri@gmail.com';

  const deleteModal = (titleAct, idAct) => {
    modal.value.toggleModal();
    title.value = titleAct;
    id.value = idAct;
  };

  const deleteActivity = async () => {
    await axios.delete(`activity-groups/${id.value}`);
    alertModal.value.toggleModal();
    getActivities();
  };

  const getActivities = async () => {
    const { data } = await axios.get('activity-groups', { params: { email } });
    activities.value = data.data;
    showAsset.value = data.data.length == 0 ? true : false;
  };

  const addActivity = async () => {
    await axios.post('activity-groups', { email, title: 'New activity' });
    getActivities();
  };

  onMounted(() => {
    getActivities();
  });
</script>

<style scoped>
  .title {
    font-size: 36px;
  }

  .bg-blue,
  .bg-blue:active {
    background-color: var(--blue);
  }

  .activity {
    background-color: white;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    padding: 25px;
    height: 234px;
    margin-bottom: 25px;
    cursor: pointer;
  }

  .activity-item-title {
    flex: 1;
  }

  .activity-item-date {
    color: var(--gray2);
  }
</style>
