<template>
  <transition>
    <div class="modal fade">
      
    </div>
  </transition>
</template>

<script>
export default {
  name: "ModalForm",
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style>

</style>
