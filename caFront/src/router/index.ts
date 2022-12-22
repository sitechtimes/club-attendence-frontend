import { createRouter, createWebHistory } from "vue-router";
import ClubView from "../views/ClubView.vue";
import Home from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import("../views/AboutView.vue");
      },
    },
    {
      path: "/club",
      name: "club",
      component: ClubView,
    },
  ],
});

export default router;
