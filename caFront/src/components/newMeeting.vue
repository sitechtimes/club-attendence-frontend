<template>
    <div class="modal-backdrop">
      <div class="add">
        <form id="form" @submit.prevent="addMeeting">
          <miniButton class="position" @click="clubActivity.closePanel()"
            >x</miniButton
          >
          <span></span>
          <label for="name">New Meeting (DD/MM/YYYY): </label>
          <input v-model="form.userValue" type="text" required id="name" />
          <h3>{{ form.userValue }}</h3>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent , reactive} from "vue";
  import { useUserDataStore } from "@/stores/userData";
  import { useClubActivity } from "../stores/clubActivity";
  import miniButton from "../components/miniButton.vue";
  export default defineComponent({
    name: "newMeeting",
    components: {
      miniButton,
    },
    props: [],
    methods: {
      close() {
        this.$emit("close");
      },
    },
    setup() {
      const clubActivity = useClubActivity();
      const userDataStore = useUserDataStore();
      const form = reactive({ userValue: "" });
      async function postData(userData: object) {
        // Default options are marked with *
        console.log("ths is post data");
        await fetch("http://localhost:3000/addMeeting", {
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
            clubCode: form.userValue,
          };
          console.log(bundle);
          console.log("jumping into postData");
        postData(bundle);
      };
      return { form, addMeeting, clubActivity };
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