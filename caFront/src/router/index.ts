import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import TeacherView from "../views/TeacherView.vue";
import StudentSearch from "../views/StudentSearch.vue";
import ErrorViewVue from "@/views/ErrorView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/scanner",
      name: "scanner",
      component: () => {
        return import(/*webpackChunkName: "qrcode" */ "@/views/Scanner.vue");
      },
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
      path: "/clubs",
      name: "clubs",
      component: () => {
        return import(
          /*webpackChunkName: "club-view" */ "../views/ClubsView.vue"
        );
      },
    },
    {
      path: "/member",
      name: "member",

      component: () => {
        return import(/*webpackChunkName: "club-view" */ "../views/Member.vue");
      },
    },
    {
      path: "/additional-information/osis",
      name: "osis",
      component: () => {
        return import(
          /*webpackChunkName: "additional-information" */ "@/views/AdditionalInformation/OsisView.vue"
        );
      },
    },
    {
      path: "/additional-information/grade",
      name: "grade",
      component: () => {
        return import(
          /*webpackChunkName: "additional-information" */ "@/views/AdditionalInformation/GradeView.vue"
        );
      },
    },
    {
      path: "/additional-information/offical-class",
      name: "officalClass",
      component: () => {
        return import(
          /*webpackChunkName: "additional-information" */ "@/views/AdditionalInformation/OfficalClassView.vue"
        );
      },
    },

    {
      path: "/teacher",
      name: "teacher",
      component: TeacherView,
    },
    {
      path: "/student",
      name: "Student",
      component: StudentSearch,
    },
    {
      path: "/president",
      name: "President",
      component: () => {
        return import("@/views/presidentView.vue");
      },
    },
    {
      path: "/club-origin",
      name: "club-origin",
      component: () => {
        return import("@/views/ClubOrgin.vue");
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404Error",
      component: ErrorViewVue,
    },
  ],
});

export default router;
