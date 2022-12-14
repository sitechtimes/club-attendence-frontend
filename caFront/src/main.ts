import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

//clientId need to be made be imported from env file
app.use(vue3GoogleLogin, {
  clientId:
    "696624175161-fjet2s1pbefuqnmn42o65p33b5tqa5p1.apps.googleusercontent.com",
});

app.mount("#app");
