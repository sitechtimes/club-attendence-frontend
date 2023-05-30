<template>
  <div class="modal-backdrop">
    <div class="add">
      <form id="form">
        <miniButton class="position" @click="clubActivity.closePanel()"
          >x</miniButton
        >
        <span></span>
        <label for="name">Input Code: </label>
        <input type="text" required id="name" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import miniButton from "../components/miniButton.vue";
export default defineComponent({
  name: "AddClub",
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

    return { clubActivity };
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
</style>
