<template>
  <h4>ResponsesListView</h4>

  <response-box
    v-for="response in responses"
    :key="response.id"
    :response="response"
  />
</template>

<script>
import ResponseBox from "../components/ResponseBox.vue";
import axios from "axios";

export default {
  components: {
    ResponseBox,
  },

  data() {
    return {
      responses: [],
    };
  },

  mounted() {
    const user_id = localStorage.getItem("user_id");

    axios.get(`/responses/company=${user_id}`).then((response) => {
      console.log(response.data);
      this.responses = response.data;
    });
  },
};
</script>

<style></style>
