<template>
  <div class="row">
    <div class="col-8">
      <h3 class="">Account</h3>
      <form>
        <div class="mb-2 row">
          <label class="col-2 col-form-label">Email adress</label>
          <input
            readonly
            v-model="this.user_info.email"
            type="email"
            class="col form-control-plaintext"
          />
        </div>
        <div class="mb-2 row">
          <label class="col-2 col-form-label">Phone number</label>

          <input
            readonly
            v-model="this.user_info.phone_number"
            type="tel"
            class="col form-control-plaintext"
          />
        </div>

        <div v-if="this.user_info.user_type === 'APPLICANT'">
          <div class="row mb-3">
            <label class="col-2 col-form-label">First name</label>
            <input
              :disabled="!onEditing"
              v-model="this.candidate_info.first_name"
              type="text"
              class="col form-control"
            />
          </div>
          <div class="row mb-2">
            <label class="col-2 col-form-label">Last name</label>
            <input
              :disabled="!onEditing"
              v-model="this.candidate_info.last_name"
              type="text"
              class="col form-control"
            />
          </div>
          <div class="row mb-2">
            <label class="col-2 col-form-label">Salary</label>
          <input
            :disabled="!onEditing"
            v-model="this.candidate_info.current_salary"
            type="number"
            class="col form-control"
          /></div>
        </div>
        <div v-else>
          <div class="row mb-2">
            <label class="col-2 col-form-label">Designation</label>
          <input
            readonly
            v-model="this.company_info.designation"
            type="text"
            class="col form-control-plaintext"
          /></div>
          <div class="row mb-2">
            <label class="col-2 col-form-label">Description</label>
          <input
            :disabled="!onEditing"
            v-model="this.company_info.description"
            type="text"
            class="col form-control"
          /></div>
          <div class="row mb-2">
            <label class="col-2 col-form-label">Establishment date</label>
          <input
            :disabled="!onEditing"
            v-model="this.company_info.establishment_date"
            type="text"
            class="col form-control"
          /></div>
          <div class="row mb-2">
            <label class="col-2 col-form-label">Website</label>
          <input
            :disabled="!onEditing"
            v-model="this.company_info.website_url"
            type="text"
            class="col form-control"
          /></div>
        </div>

        <button
          :disabled="onEditing"
          @click="editUserProfileData"
          type="button"
          class="btn btn-danger mb-2 me-3"
        >
          Edit
        </button>
        <button
          @click.prevent="saveChanges"
          v-if="onEditing"
          class="btn btn-success mb-2"
        >
          Save
        </button>
      </form>

      <div v-if="user_info.user_type === 'COMPANY'">
        <button class="btn btn-primary me-2 mb-3">
          <router-link to="/vacancy_posting" class="nav-link active"
            >Post new vacancy</router-link
          >
        </button>
        <button class="btn btn-primary mb-3">
          <router-link to="/company_vacancies" class="nav-link active"
            >Our vacancies</router-link
          >
        </button>
      </div>
    </div>
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
        designation: "",
        description: "",
        establishment_date: "",
        website_url: "",
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

    console.log(this.user_info);

    if (this.user_info.user_type === "COMPANY") {
      await axios
        .get("companies/" + this.user_info.pk)
        .then((response) => {
          console.log("hey");
          this.company_info.designation = response.data.company.designation;
          this.company_info.description = response.data.company.description;
          this.company_info.establishment_date =
            response.data.company.establishment_date;
          this.company_info.website_url = response.data.company.website_url;
          console.log(this.company_info.website_url);
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
  },
  methods: {
    editUserProfileData() {
      this.onEditing = !this.onEditing;
    },

    saveChanges() {
      if (this.user_info.user_type === "COMPANY") {
        const formData = {
          company: {
            designation: this.company_info.designation,
            description: this.company_info.description,
            establishment_date: this.company_info.establishment_date,
            website_url: this.company_info.website_url,
          },
        };

        axios.put("companies/" + this.user_info.pk, formData).then(() => {
          console.log("success");
        });
      }

      if (this.user_info.user_type === "APPLICANT") {
        const formData = {
          candidate: {
            first_name: this.candidate_info.first_name,
            last_name: this.candidate_info.last_name,
            current_salary: this.candidate_info.current_salary,
          },
        };
        axios.put("candidates/" + this.user_info.pk, formData).then(() => {
          console.log("success");
        });
      }
      this.onEditing = !this.onEditing;
    },
  },
};
</script>
