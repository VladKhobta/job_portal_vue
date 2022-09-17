<template>
  <div class="row shadow-sm mb-3">
    <div class="col-8">
      <div class="">
        <p class="">Vacancy #{{ vacancy.id }}</p>
        <h1 class="mb-5">{{ vacancy.title }}</h1>
        <h4>{{ vacancy.salary }} RUB</h4>
        <p class="mb-5">
          Required experience: {{ vacancy.required_experience }} years
        </p>
        <div v-if="user_type === 'COMPANY'">
          <button>Edit</button>
        </div>
        <div v-if="user_type === 'APPLICANT'">
          
          <div v-if="showModalResponseForm">
            <div
              class="modal fade"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">...</div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-dark" @click="showResponseForm">
            Respond
          </button>
        </div>
      </div>
    </div>
    <div class="col-4">
      <img class="w-100 p-4" src="../assets/company_logo.jpg" alt="Company" />
    </div>
  </div>
  <div class="row">
    <div class="col-8 me-3 shadow-sm">
      <p>{{ vacancy.description }}</p>
    </div>
    <div class="col shadow-sm">
      <h4 class="">{{ vacancy.company_designation }}</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VacancyView",
  props: ["id"],
  data() {
    return {
      vacancy: {},
      user_type: null,
      showModalResponseForm: false,
    };
  },

  created() {
    this.user_type = localStorage.getItem("user_type");
    this.getVacancy();
  },

  mounted() {},

  methods: {
    async getVacancy() {
      const vacancy_id = this.id;

      axios
        .get(`vacancies/${vacancy_id}`)
        .then((response) => {
          this.vacancy = response.data.vacancy;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showResponseForm() {
      this.showModalResponseForm = !this.showModalResponseForm;
      console.log(this.showModalResponseForm);
    },

    respondAction() {
      const formData = {
        vacancy: this.id,
        company: this.vacancy.company,
        candidate: localStorage.getItem("user_id"),
      };

      axios.post("/responses", formData).then(console.log("Nice"));
    },
  },
};
</script>

<style></style>
