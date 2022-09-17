<template>
<transition appear>
  <div v-if="isModalVisible" class="modal">
    <div class="modal-body" >
      gaayy
    </div>
  </div>
  </transition>
</template>

<script>
// import Modal from '@/components/Modal.vue';
// import ModalForm from "../components/ResponseModal.vue";

export default {
  components: {
    // Modal
    // ModalForm,
  },

  data() {
    return {
      isModalVisible: true,
    };
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
