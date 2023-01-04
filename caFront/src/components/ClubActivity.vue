<template>
  <div class="dropdown">
    <div class="container">
      <ul class="dropdown-item" v-if="clubActivity.isOpen">
        <li><button @click="showModal">Add Club</button></li>
        <li><button>Scan QR Code</button></li>
      </ul>
      <button class="open-panel" @click="showPanel">+</button>
    </div>
    <div>
      <AddClub v-show="isModalVisible" @close="closeModal"></AddClub>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import AddClub from "../components/AddClub.vue"
export default defineComponent({
  name: "ClubActivity",
  components: {
    AddClub
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
     
    }, closeModal() {
        this.isModalVisible = false;
      },
  },
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
  font-size: 6rem;
}

li {
  list-style: none;
  font-size: 2rem;
  width: 18rem;
  height: 3rem;
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


