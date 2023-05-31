<template>
  <div class="container">
    <form id="form" @submit.prevent="sendAdditionalUserInfo">
      <label for="name"><slot slot name="name"></slot>:</label>
      <input v-model="form.userValue" type="text" required id="name" />
      <h1>{{ form.userValue }}</h1>
      <h2 class="context"><slot name="context"></slot></h2>
      <div>{{ osisGradeOfficalClass }}</div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onBeforeMount } from "vue";
import { useUserDataStore } from "../stores/userData";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AddCard",
  props: {
    osisGradeOfficalClass: String,
  },

  setup(props) {
    const router = useRouter();
    const userDataStore = useUserDataStore();

    onBeforeMount(() => {
      if (
        userDataStore.user!.osis !== "null" &&
        userDataStore.user!.grade !== "null" &&
        userDataStore.user!.officalClass !== "null"
      ) {
        return router.push("/club");
      }
    });

    function checker() {
      if (
        userDataStore.user!.osis !== "null" &&
        userDataStore.user!.grade !== "null" &&
        userDataStore.user!.officalClass !== "null"
      ) {
        return router.push("/club");
      }
    }

    async function postData(userData: object) {
      // Default options are marked with *
      console.log("ths is post data");
      await fetch("http://localhost:3000/addOsisGradeOfficialClass", {
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
        body: JSON.stringify(userData), // body data type must match "Content-Type" header
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.status) {
            if (response.type === "OSIS") {
              userDataStore.addOsis(response.value);
              if (userDataStore.user!.grade === "none") {
                return router.push("/additional-information/grade");
              } else if (userDataStore.user!.officalClass === "none") {
                return router.push("/additional-information/offical-class");
              } else if (
                userDataStore.user!.grade !== "none" &&
                userDataStore.user!.officalClass !== "none"
              )
                checker();
            }

            if (response.type === "Grade") {
              userDataStore.addGrade(response.value);
              if (userDataStore.user!.osis === "none") {
                return router.push("/additional-information/osis");
              } else if (userDataStore.user!.officalClass === "none") {
                return router.push("/additional-information/offical-class");
              }
              checker();
            }

            if (response.type === "Official Class") {
              userDataStore.addOfficallClass(response.value);
              if (userDataStore.user!.osis === "none") {
                return router.push("/additional-information/osis");
              } else if (userDataStore.user!.grade === "none") {
                return router.push("/additional-information/grade");
              }
              checker();
            }
          }
        });
    }
    const form = reactive({ userValue: "" });
    const bundle = {
      user: userDataStore.user,
      additionalInfoType: props.osisGradeOfficalClass,
      additionalInfoValue: "",
    };

    const sendAdditionalUserInfo = () => {
      bundle.additionalInfoValue = form.userValue;
      postData(bundle);
    };
    return { form, postData, sendAdditionalUserInfo };
  },
});
</script>

<style scoped>
.container {
  background: white;
  height: 30rem;
  width: 50rem;
  border-radius: 1rem;
  border: 1px solid black;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  display: flex;
}
#form {
  font-size: 4rem;
}
</style>
