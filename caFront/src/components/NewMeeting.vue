<template>
    <div class="modal-backdrop">
      <button @click="close">Close></button>
      <div class="add">
        <form id="form" @submit.prevent="addMeeting">
          <label for="name">New Meeting (MM/DD/YYYY):</label>
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
    name: "NewMeeting",
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
        await fetch("http://localhost:3000/newMeeting", {
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
      const addMeeting = () => {
        const bundle = {
          user: userDataStore.user,
          newMeeting: form.userValue,
        };
        console.log(bundle);
        console.log("jumping into postData");
  
        postData(bundle);
      };
      return { form, addMeeting };
    },
  });
  </script>
  
  <style>
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
  }
  #form {
    font-size: 4rem;
  }
  </style>