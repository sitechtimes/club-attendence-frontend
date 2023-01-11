<template>
  <div class="container">
    <form id="form">
      <label for="name"><slot slot name="name"></slot>:</label>
      <input type="text" required id="name" />
      <h3 class="context"><slot name="context"></slot></h3>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AddCard",
  setup() {
    return {};
  },
});
</script>

<style scoped>
.container {
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
