<template>
  <div class="dropdown">
    <div class="container">
      <ul class="dropdown-item" v-if="clubActivity.isOpen">
        <li><button @click="clubActivity.showPanel()">Add Club</button></li>
        <li><button>Scan QR Code</button></li>
      </ul>
      <button class="open-panel" @click="show"><h2>+</h2></button>
    </div>
    <div>
      <AddClub v-show="clubActivity.isPanelVisible"></AddClub>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import AddClub from "../components/AddClub.vue";
export default defineComponent({
  name: "ClubActivity",
  components: {
    AddClub,
  },
  setup() {
    const clubActivity = useClubActivity();

    function show() {
      if (clubActivity.isOpen === true) {
        clubActivity.closeMenu();
      } else if (clubActivity.isOpen === false) {
        clubActivity.openMenu();
      }
    }
    return { clubActivity, show};
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
  border: 2px black solid;
  border-radius: 10rem;
  height: 7rem;
  width: 7rem;
  text-align: center;
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
  position: absolute;
  width: 20rem;
  bottom: 7.5rem;
  right: -6rem;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
