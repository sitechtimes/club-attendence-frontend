<template>
  <div class="page">
    <div class="googleButton">
      <div
      id="g_id_onload"
      data-client_id="696624175161-fjet2s1pbefuqnmn42o65p33b5tqa5p1.apps.googleusercontent.com"
      data-login_uri="https://localhost:5173"
      data-auto_prompt="true"
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
      <img class="g-logo" src="../assets/logos/google-logo.png" alt="">
    
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
.page{
  background-color: black;
  height: 100vh;
  padding: 5rem;
  text-align: center;
}

.title{
  font-size: 4rem;
  color: rgb(255, 255, 255);
  font-weight: 400;

}
.OAuth{
  margin-top: 5rem;
  height: 50rem;
  border-radius: 5rem;
  width: 40rem;
  background-color: rgb(34, 34, 34);
  color: rgb(255, 255, 255);
  font-size: 5rem;
  font-weight: 300;


}
.g-logo{
  height: 50%;
}
</style>
