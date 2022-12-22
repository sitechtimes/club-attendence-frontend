<template>
  <div class="dropdown">
    <div class="container">
      <ul class="dropdown-item" v-if="clubActivity.isOpen">
        <li><button>Add Club</button></li>
        <li><button>Input Admin Code</button></li>
        <li><button>Login</button></li>
      </ul>
      <button class="open-panel" @click="showPanel">+</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useClubActivity } from "../stores/clubActivity";
export default {
  name: "ClubActivity",
  setup() {
    const clubActivity = useClubActivity();

    function showPanel() {
      if (clubActivity.isOpen === true) {
        clubActivity.closeMenu();
      } else if (clubActivity.isOpen === false) {
        clubActivity.openMenu();
      }
    }
    return { clubActivity, showPanel };
  },
};
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
  font-size: 7rem;
  display: flex;
  justify-content: center;
}

li {
  list-style: none;
  font-size: 2rem;
  width: 18rem;
  height: 5rem;
  border: 3px solid black;
  border-radius: 1rem;
  background-color: #f3c87c;
}
li button {
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
</style>
