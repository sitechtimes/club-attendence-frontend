<template>
  <div class="container">
    <form id="form" @submit.prevent="sendAdditionalUserInfo">
      <label for="name"><slot slot name="name"></slot>:</label>
      <input v-model="form.userValue" type="text" required id="name" />
      <h3>{{ form.userValue }}</h3>
      <h3 class="context"><slot name="context"></slot></h3>
      <div>{{ osisGradeOfficalClass }}</div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useUserDataStore } from "../stores/userData";

export default defineComponent({
  name: "AddCard",
  props: {
    osisGradeOfficalClass: String || Number,
  },

  setup(props) {
    const userDataStore = useUserDataStore();
    async function postData(userData: object) {
      // Default options are marked with *
      console.log("ths is post data");
      await fetch("http://localhost:3000/addOsisGradeOfficalClass", {
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
        .then((ifSuccessful) => {
          console.log(ifSuccessful);
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
