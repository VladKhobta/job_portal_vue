<template>
  <div class="row">
    <div class="col" />
    <div class="col-3">
      <h3 class="">Account</h3>
      <form>
        <input
          :disabled="!onEditing"
          v-model="email"
          type="email"
          class="form-control mb-2"
        />
        <input
          :disabled="!onEditing"
          v-model="phone_number"
          type="tel"
          class="form-control mb-2"
        />

        <button :disabled="onEditing" @click="editUserProfileData" type="button" class="btn btn-primary me-2">
          Edit
        </button>
        <button @click="saveChanges" v-if="onEditing" class="btn btn-primary">
          Save
        </button>
      </form>
    </div>

    <div class="col" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileView",
  data() {
    return {
      email: "",
      phone_number: "",
      onEditing: false,
    };
  },

  created() {
    this.email = localStorage.getItem("email");
    this.phone_number = localStorage.getItem("phone_number");
  },

  methods: {
    editUserProfileData() {
      this.onEditing = !this.onEditing;
    },

    saveChanges() {
      const pk = localStorage.getItem("user_id");
      const formData = {
        user: {
          email: this.email,
          phone_number: this.phone_number,
        },
      };

      localStorage.setItem("phone_number", this.phone_number);
      localStorage.setItem("email", this.email);

      axios
        .put("account/" + pk, formData)
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else if (error.message) {
            this.errors.push("Something went wrong. Please try again");
          }
        });
    },
  },
};
</script>
