<template>
<div id="app">
  <div class="container">
    <button class="btn btn-info" @click="showModal">show modal</button>
    <div ref="modal">sheesh</div>
  </div>
</div>
<button class="btn btn-dark" @click="showModal">Click</button>
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
      modalIsOpen: false,
    };
  },
  methods: {
    showModal() {
      let element = this.$ref.modal.$el 
      element.modal('show')
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>
