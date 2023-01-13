import { createRouter, createWebHistory } from "vue-router";
import ClubView from "../views/ClubView.vue"
import HomeView from '../views/HomeView.vue'
import TeacherView from '../views/TeacherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    {
      path: "/qrcode",
      name: "qrcode",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import("../views/QRCode.vue");
      },
    },
    {
      path: "/club",
      name: "club",
      component: ClubView,
    },
    {
      
        path:'/teacher',
        name:'teacher',
        component: TeacherView
      
    }
  ],
});
      

export default router;
