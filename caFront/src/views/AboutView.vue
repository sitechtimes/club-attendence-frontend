<template>
  <div class="stevenHomePagePOG">
    <section class="left" > 
      <img class="see"  src="../assets/logos/Seegal.png" alt="">

    </section>
    <section class="right" >
      <div class="box">
        <div class="title">Staten Island Technical High School Club Attendance</div>

          <button class="OAuth" @click="login">
            <img
              class="g-logo"
              src="../components/icons/google-logo.png"
              alt="g-logo"
            />
            <h3>Sign In With Google</h3>

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


.see{
  position: relative;
  z-index: 2;
}
.box{
  width: 40vw;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  font-size: 5vw;
}
/* .OAuth{
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  border-width: 0.1rem;
  background-color: white;
  box-shadow:  7px 10px 10px grey ;
}
.g-logo{
  height: 5rem;
} */
.stevenHomePagePOG{
  display: flex;
  position: relative;
  overflow: hidden;
}
.left{
  background-color: #F3C87C;
  height: 100vh;
  width: 40vw;
  display: flex;
  justify-content: center;
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
  background-color: rgb(22, 22, 22);
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