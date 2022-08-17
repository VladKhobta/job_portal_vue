<template>
  <div class="row">
    <div class="col" />
    <div class="col-3">
      <h3 class="">Account</h3>
      <form>
        <input
          :disabled="!onEditing"
          v-model="this.user_info.email"
          type="email"
          class="form-control mb-2"
        />
        <input
          :disabled="!onEditing"
          v-model="this.user_info.phone_number"
          type="tel"
          class="form-control mb-2"
        />
        <div v-if="this.user_info.user_type === 'APPLICANT'">
          <input
            :disabled="!onEditing"
            v-model="this.candidate_info.first_name"
            type="text"
            class="form-control mb-2"
          />
          <input
            :disabled="!onEditing"
            v-model="this.candidate_info.last_name"
            type="text"
            class="form-control mb-2"
          />
          <input
            :disabled="!onEditing"
            v-model="this.candidate_info.current_salary"
            type="number"
            class="form-control mb-2"
          />
        </div>

        <button
          :disabled="onEditing"
          @click="editUserProfileData"
          type="button"
          class="btn btn-primary me-2"
        >
          Edit
        </button>
        <button
          @click.prevent="saveChanges"
          v-if="onEditing"
          class="btn btn-primary"
        >
          Save
        </button>
      </form>
      
        <div v-if="user_info.user_type === 'COMPANY'">
          <button class="btn btn-primary mt-2"><router-link
              to="/vacancy_posting"
              class="nav-link active"
              >Post new vacancy</router-link
            ></button>
        </div>
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
      user_info: {
        email: "",
        phone_number: "",
        user_type: "",
        pk: null,
      },
      candidate_info: {
        first_name: "",
        last_name: "",
        current_salary: 0,
      },
      company_info: {

      },
      onEditing: false,
    };
  },

  async created() {
    this.user_info.email = localStorage.getItem("email");
    this.user_info.phone_number = localStorage.getItem("phone_number");
    this.user_info.user_type = localStorage.getItem("user_type");
    this.user_info.pk = localStorage.getItem("user_id");

    if (this.user_info.user_type === "APPLICANT") {
      await axios
        .get("candidates/" + this.user_info.pk)
        .then((response) => {
          this.candidate_info.last_name = response.data.candidate.last_name;
          this.candidate_info.first_name = response.data.candidate.first_name;
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
    }

    console.log(this.user_info)

    if (this.user_type === "COMPANY") {
      null
    }

  },
  methods: {
    editUserProfileData() {
      this.onEditing = !this.onEditing;
    },

    saveChanges() {
      const formData = {
        user: {
          email: this.email,
          phone_number: this.phone_number,
        },
      };

      localStorage.setItem("phone_number", this.phone_number);
      localStorage.setItem("email", this.email);

      axios
        .put("account/" + this.pk, formData)
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

      this.onEditing = !this.onEditing;
    },
  },
};
</script>
