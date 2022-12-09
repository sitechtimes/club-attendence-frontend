<template>
  <div class="page">
    <div class="googleButton">
      <div
        id="g_id_onload"
        data-client_id="696624175161-fjet2s1pbefuqnmn42o65p33b5tqa5p1.apps.googleusercontent.com"
        data-login_uri="http://localhost:3000/login"
        data-auto_prompt="false"
      ></div>
      <div
        class="g_id_signin google"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="pill"
        data-width="400"
        data-logo_alignment="left"
        ref="googleBtn"
      ></div>
    </div>

    <h1 class="title">Staten Island Technical High School Club Attendance</h1>

    <button class="OAuth" @click="clickGoogle">
      <h2>Sign In With Google</h2>
      <img class="g-logo" src="../assets/logos/google-logo.png" alt="" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  setup() {
    const googleBtn = ref<HTMLElement | null>(null);
    const state = reactive({
      name: "The Name",
      num: 31 as number,
    });
    function clickGoogle() {
      googleBtn.value?.firstChild?.firstElementChild?.firstElementChild.click();
    }
    return {
      state,
      googleBtn,
      clickGoogle,
    };
  },

  methods: {},
});
</script>

<style scoped>
.google {
  display: none;
}
.page {
  background-color: black;
  height: 100vh;
  padding: 5rem;
  text-align: center;
}

.title {
  font-size: 4rem;
  color: rgb(255, 255, 255);
  font-weight: 400;
}
.OAuth {
  margin-top: 5rem;
  height: 50rem;
  border-radius: 5rem;
  width: 40rem;
  background-color: rgb(34, 34, 34);
  color: rgb(255, 255, 255);
  animation: float 3s ease-in-out infinite;
}
.OAuth h2 {
  position: relative;
  width: 77%;
  margin: auto;
}

.OAuth h2:before {
  content: "";
  position: absolute;
  width: 0%;
  height: 0.2rem;
  border-radius: 20rem;
  background-color: white;
  bottom: 0;
  left: 0;
  transition: all 0.5s;
}

.OAuth h2 {
  font-size: 3rem;
  font-weight: 400;
}
.g-logo {
  height: 50%;
}

.OAuth:hover {
  background-color: rgba(88, 88, 88, 0.444);
}
.OAuth:hover h2:before {
  width: 100%;
}

@keyframes float {
  0% {
    transform: translate(0, 0px);
  }
  50% {
    transform: translate(0, 20px);
  }
  100% {
    transform: translate(0, 0px);
  }
}
</style>
