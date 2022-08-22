<template>
  <div class="row">
    <div class="col" />
    <div class="col-3">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address:</label
          >
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Password:</label
          >
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="notification is-danger" v-if="errors.length">
          <div v-for="error in errors" v-bind:key="error">
            <div class="alert alert-danger" role="alert">
              {{ error }}
            </div>
          </div>
        </div>
        <button
          @click.prevent="submitLoginForm"
          type="submit"
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
    <div class="col" />
  </div>

  <div class="d-flex justify-content-center">
    <div class="d-flex flex-column mb-3">
      <div class="p-2">Flex item bigger</div>
      <div class="p-2">Flex item 2</div>
      <div class="p-2">Flex item 3</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogInView",
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    async submitLoginForm() {
      this.errors = [];

      axios.defaults.headers.common["Authorization"] = "";
      localStorage.removeItem("token");

      const formData = {
        username: this.email,
        password: this.password,
      };

      await axios
        .post("/account/login/", formData)
        .then((response) => {
          const token = response.data.token;
          const user_id = response.data.user_id;
          const email = response.data.email;
          const phone_number = response.data.phone_number;
          const user_type = response.data.user_type;
          this.$store.commit("setToken", token);

          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
          localStorage.setItem("user_id", user_id);
          localStorage.setItem("email", email);
          localStorage.setItem("phone_number", phone_number);
          localStorage.setItem("user_type", user_type);
          const toPath = this.$route.query.to || "/";
          this.$router.push(toPath);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else {
            this.errors.push("Something went wrong. Please try again");
          }
        });
    },
  },
};
</script>
