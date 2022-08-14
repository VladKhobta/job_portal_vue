import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import SignUpView from "../views/SignUpView.vue";
import LogInView from "../views/LogInView.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
