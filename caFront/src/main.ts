import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(createPinia().use(piniaPluginPersistedstate));

app.use(router);
app.use(VCalendar, {});

//clientId need to be made be imported from env file
app.use(vue3GoogleLogin, {
  clientId: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
});

app.mount("#app");
