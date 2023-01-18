<template>
  <div class="modal-backdrop">
    <div class="add">
      <form id="form">
        <Button class="position" @click="clubActivity.closePanel()"
          >Close></Button
        >
        <span></span>
        <label for="name">Input Code:</label>
        <input type="text" required id="name" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useClubActivity } from "../stores/clubActivity";
import Button from "../components/Button.vue";
export default defineComponent({
  name: "AddClub",
  components: {
    Button,
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
