<template>
  <div class="stevenHomePagePOG">
    <section class="left" > </section>
    <section class="right" >
      <div class="box">
        <h2 class="title">Staten Island Technical High School Club Attendance</h2>

          <button class="OAuth" @click="login">
            <img
              class="g-logo"
              src="../components/icons/google-logo.png"
              alt="g-logo"
            />
            <h2>Sign In With Google</h2>

          </button>
  
      </div>
      
      <div class="circle"></div>
      <div class="circle2"></div>
    </section>


  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { googleTokenLogin } from "vue3-google-login";
import { useRouter } from "vue-router";
import { useUserDataStore } from "../stores/userData";

export default defineComponent({
  setup() {
    const router = useRouter();
    const userDataStore = useUserDataStore();

    const login = () => {
      googleTokenLogin().then((userCredential) => {
        console.log("Handle the response", userCredential);
        postData({ userCredential });
      });
    };

    async function postData(data: object) {
      // Default options are marked with *
      console.log("ths is post data");
      await fetch("http://localhost:3000/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.type === "student") {
            userDataStore.addUserData(data);
            if (data.osis === "none") {
              return router.push("/additional-information/osis");
            }
            if (data.grade === "none") {
              return router.push("/additional-information/grade");
            }
            if (data.officalClass === "none") {
              return router.push("/additional-information/offical-class");
            }
            return router.push("/club");
          } else if (data.type === "admin") {
            userDataStore.addUserData(data);
            return router.push("/admin");
            //  data.grade === "none" || data.officalClass === "none"
          }
        });
    }

    return {
      login,
    };
  },
  methods: {},
});
</script>

<style scoped>

.OAuth{
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  border-width: 0.1rem;
  background-color: white;
  box-shadow:  5px 1px 100px 1px;
}
.g-logo{
  height: 5rem;
}
.stevenHomePagePOG{
  display: flex;
  position: relative;
  overflow: hidden;
}
.left{
  background-color: #F3C87C;
  height: 100vh;
  width: 40vw;
}
.right{
  height: 100vh;
  width: 60vw;
  display: flex;
  justify-content: space-evenly;
}
.circle{
  position: absolute;
  z-index: 1;
  width: 65%;
height: 100%;
left: -30%;
top: 50%;
  border-radius: 50%;
  background-color: black;

}

.circle2{
  position: absolute;
  background-color: black;
  border-radius: 100%;
  z-index: 1;
  width: 60%;
  height: 40%;
  top: -20%;
  right: -50%;

}






</style>  