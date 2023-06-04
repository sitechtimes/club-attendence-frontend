<template>
  <div class="dropdown">
    <div class="buttonpanel">
      <ul class="dropdown-item" v-if="clubActivity.isOpen">
        <li>
          <router-link to="/clubs">
            <button class="openscan">Clubs</button>
          </router-link>
        </li>
        <li>
          <router-link
            v-if="userStore.user?.clientAuthority == 'admin'"
            to="/teacher"
          >
            <button class="openscan">Teacher</button>
          </router-link>
        </li>
        <li>
          <router-link
            v-if="userStore.user?.clientAuthority == 'admin'"
            to="/club-origin"
          >
            <button class="openscan">Club Origins</button>
          </router-link>
        </li>
        <li>
          <button @click="clubActivity.showPanel()">Add Club</button>
        </li>
        <li>
          <router-link to="/scanner">
            <button @click="clubActivity.openCamera()" class="openscan">
              Scan QR Code
            </button>
          </router-link>
        </li>
      </ul>
      <button class="open-panel" @click="show"><h2>+</h2></button>
    </div>
    <div>
      <AddClub v-show="clubActivity.isPanelVisible"></AddClub>
    </div>
    <div>
      <Camera v-show="clubActivity.isCameraVisible"></Camera>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import AddClub from "../components/AddClub.vue";
import Camera from "../components/Camera.vue";
import { RouterLink } from "vue-router";
import { useUserDataStore } from "@/stores/userData";
export default defineComponent({
  name: "ClubActivity",
  components: {
    AddClub,
    Camera,
    RouterLink,
  },
  setup() {
    const clubActivity = useClubActivity();
    const userStore = useUserDataStore();

    function show() {
      if (clubActivity.isOpen === true) {
        clubActivity.closeMenu();
      } else if (clubActivity.isOpen === false) {
        clubActivity.openMenu();
      }
    }

    return { clubActivity, show, userStore };
  },
  data: () => {
    return {
      isModalVisible: false,
    };
  },
});
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
.open-panel {
  font-size: 6rem;
  position: fixed;
  border: 2px black solid;
  border-radius: 10rem;
  height: 7rem;
  width: 7rem;
  text-align: center;
  bottom: 5rem;
  right: 5rem;
}

li {
  list-style: none;
  font-size: 2rem;
  width: 18rem;
  border: 3px solid black;
  border-radius: 1rem;
  background-color: #f3c87c;
}
li button {
  height: 4rem;
  font-size: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
}
.dropdown-item {
  font-size: 2rem;
  position: fixed;
  width: 20rem;
  bottom: 13rem;
  right: 2rem;
}
.buttonpanel {
  display: flex;
  align-items: center;
  justify-content: center;
}
.openscan {
  font-size: 2rem;
}
</style>
