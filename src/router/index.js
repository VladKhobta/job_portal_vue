import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import LogInView from "../views/LogInView.vue";
import ProfileView from "../views/ProfileView.vue";
import LogOutView from "../views/LogOutView.vue";
import VacancyPostingView from "../views/VacancyPostingView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },

  {
    path: "/signup",
    name: "SignUpView",
    component: SignUpView,
  },

  {
    path: "/login",
    name: "LogInView",
    component: LogInView,
  },

  {
    path: "/logout",
    name: "LogOutView",
    component: LogOutView,
  },

  {
    path: "/profile",
    name: "ProfileView",
    component: ProfileView,
  },

  {
    path: "/vacancy_posting",
    name: "VacancyPostingView",
    component: VacancyPostingView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
