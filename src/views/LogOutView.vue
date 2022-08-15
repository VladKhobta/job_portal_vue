<template>Successfuly log out</template>

<script>
export default {
  name: "SignUpView",

  beforeCreate() {
    this.$store.commit("removeToken");
    localStorage.removeItem("token");
    console.log("success");
  },
};
</script>

<style></style>
