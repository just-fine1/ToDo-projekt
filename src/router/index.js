import { createRouter, createWebHistory } from "vue-router";

import { supabase } from "../lib/supabase";

import AuthView from "../views/Auth.vue";

import DashboardView from "../views/Dashboard.vue";

import SignupView from "../views/Signup.vue";

import LoginView from "../views/Login.vue";

const routes = [

  {

    path: "/auth",

    name: "auth",

    component: AuthView,

  },

  {

    path: "/dashboard",

    name: "dashboard",

    component: DashboardView,

    meta: { requiresAuth: true },

  },

  {

    path: "/signup",

    name: "signup",

    component: SignupView,

  },

  {

    path: "/login",

    name: "login",

    component: LoginView,

  },

];

const router = createRouter({

  history: createWebHistory(),

  routes,

});

// Route Guard

router.beforeEach(async (to) => {

  const {

    data: { session },

  } = await supabase.auth.getSession();

  if (to.meta.requiresAuth && !session) {

    return "/login";

  }

  return true;

});

export default router;