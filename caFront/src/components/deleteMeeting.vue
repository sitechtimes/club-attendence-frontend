<template>
  <div class="modal-backdrop">
    <div class="delete">
      <form id="form" @submit.prevent="deleteMeeting()">
        <miniButton class="position" @click="clubActivity.closeDMeeting()"
          >x</miniButton
        >
        <span></span>
        <label for="name">Meeting To Delete (DD/MM/YYYY): </label>
        <input v-model="form.userValue" type="text" required id="name" />
        <h3>{{ form.userValue }}</h3>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useUserDataStore } from "@/stores/userData";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  name: "deleteMeeting",
  components: {
    miniButton,
  },
  props: {},
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
      await fetch("http://localhost:3000/deleteMeeting", {
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

    const deleteMeeting = async () => {
      const bundle = {
        user: userDataStore.user,
        deleteMeeting: form.userValue,
        clubName: clubActivity.clubName,
      };
      await postData(bundle);
      console.log("vdssdnl");

      userDataStore.deleteMeeting(clubActivity.clubName, form.userValue);
    };
    return { form, deleteMeeting, clubActivity };
  },
});
</script>

<style scoped>
.delete {
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
  .delete {
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
  .delete {
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
