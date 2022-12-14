<template>
  <div class="page">
    <h1 class="title">Staten Island Technical High School Club Attendance</h1>
    <div class="googleButton">
      <GoogleLogin :callback="callback" popup-type="TOKEN">
        <button class="OAuth">
          <h2>Sign In With Google</h2>
          <img
            class="g-logo"
            src="../components/icons/google-logo.png"
            alt=""
          />
        </button>
      </GoogleLogin>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { CallbackTypes } from "vue3-google-login";

export default defineComponent({
  setup() {
    const state = reactive({});

    const callback: CallbackTypes.CodeResponseCallback = (response) => {
      console.log("Authorization code", response);
      postData({ response });
    };

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

    async function postData(data: object) {
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

    return {
      state,
      callback,
    };
  },
  methods: {},
});
</script>

<style scoped>
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
