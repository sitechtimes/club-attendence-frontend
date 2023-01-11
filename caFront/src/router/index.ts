import { createRouter, createWebHistory } from "vue-router";
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
      path: "/qrcode",
      name: "qrcode",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => {
        return import(/*webpackChunkName: "qrcode" */ "@/views/QRCode.vue");
      },
    },
    {
      path: "/club",
      name: "club",

      component: () => {
        return import(
          /*webpackChunkName: "club-view" */ "../views/ClubView.vue"
        );
      },
    },
    {
      path: "/additional-information",
      name: "additional-information",
      component: () => {
        return import(
          /*webpackChunkName: "additional-information" */ "@/views/AdditionalInformation.vue"
        );
      },
    },
  ],
});

export default router;
