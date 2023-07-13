<template>
  <div class="homepage-content">
    <section class="left-side">
      <img class="seagull-image" src="../assets/logos/seagull.svg" alt="seagull" />
    </section>
    <section class="right-side">
      <div class="wrapper">
        <h1 class="title">SITHS Club Attendance</h1>
        <button class="oauth" @click="login">
          <img class="google-logo" src="../components/icons/google-logo.png" alt="google logo" />
          <h2 class="signin-text">Sign In With Google</h2>
        </button>
      </div>
      <div class="circles circle"></div>
      <div class="circles circle2"></div>
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
      await fetch("https://tech-club-attendance.onrender.com/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow",
        referrerPolicy: "no-referrer-when-downgrade",
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.clientAuthority === "student") {
            userDataStore.addUserData(data);
            if (data.osis === null) {
              return router.push("/additional-information/osis");
            }
            if (data.grade === null) {
              return router.push("/additional-information/grade");
            }
            if (data.officialClass === null) {
              return router.push("/additional-information/offical-class");
            }
            return router.push("/club");
          } else if (data.clientAuthority === "admin") {
            userDataStore.addUserData(data);
            return router.push("/club");
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
.title {
  font-family: 'Poppins', sans-serif;
  margin-top: 10%;
  padding: 30px;
  width: 60vw;
  font-size: 5rem;
  font-weight: 500;
}

.left-side {
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  background-color: #f3c87c;
  padding: 5rem;
  width: 40vw;
}

.seagull-image {
  position: relative;
  z-index: 10;
  filter: 
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) 
    brightness(190%);
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 40vw;
  height: 50%;
  font-size: 5vw;

}
.signin-text {
  font-size: 2.5rem;
  font-weight: 400;
  white-space: nowrap;
}

.homepage-content {
  display: flex;
  position: relative;
  overflow: hidden;
}

.right-side {
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
  width: 60vw;
}

.circle {
  position: absolute;
  z-index: 1;
  width: 65%;
  height: 100%;
  left: -30%;
  top: 50%;
  border-radius: 50%;
  background-color: #000000;
}

.circle2 {
  position: absolute;
  background-color: #000000;
  border-radius: 100%;
  z-index: 1;
  width: 60%;
  height: 40%;
  top: -20%;
  right: -50%;
}

.oauth {
  margin-top: 5rem;
  height: 50vh;
  border-radius: 5rem;
  width: 50vh;
  background-color: rgb(34, 34, 34);
  color: rgb(255, 255, 255);
}

.oauth h2:before {
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
.oauth:hover {
  background-color: rgb(22, 22, 22);
}
.oauth:hover h2:before {
  width: 100%;
}

.google-logo {
  height: 30%;
}

@media (max-width: 1000px) {
  .left-side {
    display: none;
  }

  .circles {
    display: none;
  }

  .right-side {
    margin: auto;
    font-size: 10rem;
  }
  .title {
    font-size: 7vw;
    width: 100vw;
  }
  .oauth h3 {
    font-size: 7vw;
  }
}
</style>
