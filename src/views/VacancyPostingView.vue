<template>
  <div class="row">
    <div class="col" />
    <div class="col-3">
      <h3 class="">Post a new vacancy:</h3>
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

        <div v-if="this.user_type === 'APPLICANT'">
          <input
            :disabled="!onEditing"
            v-model="first_name"
            type="text"
            class="form-control mb-2"
          />
          <input
            :disabled="!onEditing"
            v-model="last_name"
            type="text"
            class="form-control mb-2"
          />
          <input
            :disabled="!onEditing"
            v-model="current_salary"
            type="number"
            class="form-control mb-2"
          />
          <input
            :disabled="!onEditing"
            v-model="user_type"
            type="text"
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

      <div v-if="user_type === 'COMPANY'">
        <button class="btn btn-primary mt-2">Post new offer</button>
      </div>
    </div>

    <div class="col" />
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "ProfileView",
  data() {
    return {};
  },
};
</script>
