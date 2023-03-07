import { createRouter, createWebHistory } from "vue-router";
import AboutView from "../views/AboutView.vue"
import ClubView from "../views/ClubView.vue"
import HomeView from '../views/HomeView.vue'
import TeacherView from '../views/TeacherView.vue'
import Scanner from '../views/OpenScanner.vue'
import Member from '../views/Member.vue'
import Home from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    
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
      path: "/member",
      name: "member",

      component: () => {
        return import(
          /*webpackChunkName: "club-view" */ "../views/Member.vue"
        );
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
      path: "/scanner",
      name: "scanner",
      component: () => {
        return import(
          /*webpackChunkName: "additional-information" */ "@/views/AdditionalInformation/OpenScanner.vue"
        );
      },
    },

    {
      
        path:'/teacher',
        name:'teacher',
        component: TeacherView
      
    }
  ],
});
      

export default router;
