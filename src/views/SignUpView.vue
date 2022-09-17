<template>
  <!-- <div class="row mb-3">
    <div class="col-4" />
    <div class="col-4 align-self-center">
      <form>
        <div class="mb-3">
          <label class="form-label">Email address:</label>
          <input v-model="email" type="email" class="form-control" />
          <div class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Password:</label
          >
          <input v-model="password" type="password" class="form-control" />
        </div>

        <label class="form-label">Repeat password:</label>
        <input v-model="password2" type="password" class="mb-3 form-control" />

        <label class="form-label">Phone number:</label>
        <input v-model="phone_number" type="tel" class="mb-3 form-control" />

        <div v-if="!isEmployee">
          <div class="mb-3">
            <label class="form-label">Designation of company:</label>
            <input v-model="designation" type="text" class="form-control" />
          </div>
        </div>
        <div class="notification is-danger" v-if="errors.length">
          <div v-for="error in errors" v-bind:key="error">
            <div class="alert alert-danger" role="alert">
              {{ error }}
            </div>
          </div>
        </div>
       
      </form>
       <div class="btn-group mb-3" role="group">
          <button
            type="button"
            class="btn btn-dark"
            @click="toggle"
            :disabled="isEmployee"
          >
            I'm employee
          </button>
          <button
            type="button"
            class="btn btn-dark"
            @click="toggle"
            :disabled="!isEmployee"
          >
            I'm employer
          </button>
        </div>
        <button
          @click.prevent="submitSignupForm"
          type="submit"
          class="btn btn-dark"
        >
          Submit
        </button>
    </div>
  </div> -->

  <form>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="email" class="form-control" v-model="email" />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" v-model="password" />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Repeat password</label>
      <div class="col-sm-10">
        <input type="password" class="form-control" v-model="password2" />
      </div>
    </div>
    <div class="row mb-3">
      <label class="col-sm-2 col-form-label">Phone number</label>
      <div class="col-sm-10">
        <input type="number" class="form-control" v-model="phone_number" />
      </div>
    </div>
    <div v-if="!isEmployee">
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label">Designation</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" v-model="designation" />
        </div>
      </div>
    </div>
    <div class="notification is-danger" v-if="errors.length">
      <div v-for="error in errors" v-bind:key="error">
        <div class="alert alert-danger" role="alert">
          {{ error }}
        </div>
      </div>
    </div>
    <fieldset class="row mb-3">
      <legend class="col-form-label col-sm-2 pt-0">Yor purpose</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="radio"
            @click="isEmployee = true"
            checked
          />
          <label class="form-check-label"> I'm an employee </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="radio"
            @click="isEmployee = false"
          />
          <label class="form-check-label"> I'm an employer </label>
        </div>
      </div>
    </fieldset>
    <button
      type="submit"
      class="btn btn-dark"
      @click.prevent="submitSignupForm"
    >
      Sign up
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUpView",
  data() {
    return {
      isEmployee: true,
      email: "",
      password: "",
      password2: "",
      designation: "",
      phone_number: "",
      errors: [],
    };
  },
  methods: {
    submitSignupForm() {
      this.errors = [];
      if (this.email === "") {
        this.errors.push("The email is missing");
      }
      if (this.password === "") {
        this.errors.push("Password: The password is too short");
      }
      if (this.password !== this.password2) {
        this.errors.push("Password: The passwords doesn't match");
      }
      if (!this.errors.length) {
        const user_type = this.isEmployee ? "APPLICANT" : "COMPANY";

        const formData = {
          user: {
            email: this.email,
            password: this.password,
            user_type: user_type,
            designation: this.designation,
            phone_number: this.phone_number,
          },
        };
        console.log(this.isEmployee);
        console.log(formData);
        axios
          .post("account/", formData)
          .then(() => {
            console.log("success");
            this.$router.push("/login");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");
            }
          });
      }
    },
  },

  watch: {
    isEmployee(newVal) {
      console.log(newVal);
    },
  },
};
</script>
