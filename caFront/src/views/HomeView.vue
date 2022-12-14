<template>
<<<<<<< Updated upstream
  <div class="home">

</div>


</template>

<script lang="ts">
// @ is an alias to /src
import Card from '../components/Card.vue'
import Button from '../components/Button.vue'
export default {
  name: 'Home',
  components: {
    Card,
    Button,
=======
  <div class="page">
    <div class="googleButton">
      <div
        id="g_id_onload"
        data-client_id="696624175161-fjet2s1pbefuqnmn42o65p33b5tqa5p1.apps.googleusercontent.com"
        data-login_uri="http://localhost:3000/login"
        data-ux_mode="redirect"
        data-auto_prompt="false"
      ></div>
      <button class="g_id_signin OAuth" @click="clickGoogle">
        <h2>Sign In With Google</h2>
        <img class="g-logo" src="../assets/logos/google-logo.png" alt="" />
      </button>
    </div>

    <h1 class="title">Staten Island Technical High School Club Attendance</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  setup() {
    const googleBtn = ref<HTMLElement | null>(null);
    const state = reactive({
      name: "The Name",
      num: 31 as number,
    });
    function clickGoogle() {
      // console.log(
      //   googleBtn.value?.firstChild?.firstElementChild?.firstElementChild
      // );
      const googleBtn = document.getElementsByClassName("S9gUrf-YoZ4jf")[0];
      const googleBtn2 = googleBtn.children[1].firstChild;
      // console.log(googleBtn2);
      googleBtn2.click();

      // googleBtn.value?.firstChild?.firstElementChild?.firstElementChild.click();
    }

    async function getData() {
      // Default options are marked with *
      const response = await fetch("http://localhost:3000/")
        .then((returnData) => {
          return returnData.json();
        })
        .then((data) => {
          // `data` is the parsed version of the JSON returned from the above endpoint.
          console.log(data); // { "userId": 1, "id": 1, "title": "...", "body": "..." }
        });
    }

    async function postData(data: any) {
      // Default options are marked with *
      const response = await fetch("http://localhost:3000/login", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    window.handleCredentialResponse = (response: any) => {
      console.log(response.g_csrf_token);
      postData(response);
      // getData();
    };

    return {
      state,
      googleBtn,
      clickGoogle,
    };
>>>>>>> Stashed changes
  },

<<<<<<< Updated upstream
=======
<style scoped>
.S9gUrf-YoZ4jf {
  display: hidden;
}

.page {
  background-color: black;
  height: 100vh;
  padding: 5rem;
  text-align: center;
>>>>>>> Stashed changes
}

</script>

<style scoped>
</style>