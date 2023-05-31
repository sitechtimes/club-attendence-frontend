<template>
  <div class="modal-backdrop">
    <button @click="close">Close></button>
    <div class="add">
      <form id="form" @submit.prevent="addClub">
        <label for="name">Input Code:</label>
        <input v-model="form.userValue" type="text" required id="name" />
        <h3>{{ form.userValue }}</h3>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserDataStore } from "@/stores/userData";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "AddClub",
  components: {},
  props: [],
  methods: {
    close() {
      this.$emit("close");
    },
  },
  setup() {
    const userDataStore = useUserDataStore();
    const form = reactive({ userValue: "" });
    async function postData(userData: object) {
      // Default options are marked with *
      console.log("ths is post data");
      await fetch("http://localhost:3000/addclub", {
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
        });
    }
    const addClub = () => {
      const bundle = {
        user: userDataStore.user,
        clubCode: form.userValue,
      };
      console.log(bundle);
      console.log("jumping into postData");

      postData(bundle);
    };
    return { form, addClub };
  },
});
</script>

<style scoped>
.add {
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
  z-index: 2;
}
#form {
  font-size: 4rem;
}
.position {
  position: fixed;
  top: 3rem;
  right: 3rem;
}
@media (max-width: 1150px) {
  .add {
    background: white;
    height: 50rem;
    width: 40rem;
  }
  #form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
@media (max-width: 450px) {
  .add {
    background: white;
    height: 40rem;
    width: 30rem;
  }
  #form {
    font-size: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

