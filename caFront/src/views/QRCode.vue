<template>
  <div class="box">
    <h2>Add Club</h2>
    <form id="form" @submit.prevent="signInButtonPressed">
      <label for="fname">Input Code: </label>
      <input type="text" required id="name" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "About",
  components: {},
  methods: {
    signInButtonPressed(event) {
      console.log("Sign In Button Pressed");
      event.preventDefault();
      event.target.reset();
    },
  },
});
</script>

<style>
.box {
  height: 25rem;
  width: 35rem;
  border: 5px solid black;
  border-radius: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#form {
  margin-top: 2rem;
  font-size: 3rem;
  display: flex;
  justify-content: center;
}
</style>
